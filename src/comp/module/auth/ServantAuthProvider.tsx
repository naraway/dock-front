import { CitizenAuthStorage, CitizenUser, CitizenUserEnvoy } from '@nara-way/checkpoint';
import * as React from 'react';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

export interface ServantAuthInfo {
  username: string;
  password: string;
  pavilionId: string;

  // dev
  loggedIn?: boolean;
  cineroomIds?: string[];
  citizen?: CitizenUser;
  citizenSessionId?: string,
  token?: { access: string, refresh: string };
}

export interface ServantAuth {
  loggedIn: boolean;
  cineroomIds: string[];
  citizen: CitizenUser | null;
  token: { access: string | null, refresh: string | null } | null;
  login: typeof CitizenUserEnvoy.login;
  logout: typeof CitizenUserEnvoy.logout;
  refresh: () => void;
}

export const ServantAuthContext = createContext<ServantAuth>({
  loggedIn: false,
  cineroomIds: [],
  citizen: null,
  token: { access: null, refresh: null },
  login: CitizenUserEnvoy.login,
  logout: CitizenUserEnvoy.logout,
  refresh: () => {},
});

const ServantAuthProvider = (props: {
  children: ReactNode,
  development: boolean,
  authorize?: boolean,
  devauth?: ServantAuthInfo,
}) => {
  const ref = useRef<CitizenAuthStorage | null>(null);
  const { development = false, devauth, authorize = true, children } = props;
  const [ auth, setAuth ] = useState<ServantAuth>({
    loggedIn: false,
    cineroomIds: [],
    token: null,
    citizen: null,
    login: CitizenUserEnvoy.login,
    logout: CitizenUserEnvoy.logout,
    refresh: async () => await setAuth({...auth}),
  });

  useEffect(() => {
    if (!ref.current) {
      ref.current = CitizenAuthStorage.instance;
    }

    // dev only
    if (development && devauth && authorize) {
      if (!auth || !auth.loggedIn) {
        if (devauth.citizen) {
          const loggedIn = devauth.loggedIn || true;
          const token = devauth.token || { access: '', refresh: '' };
          const citizen = devauth.citizen || CitizenUser.new();
          const cineroomIds = devauth.cineroomIds || [];
          const citizenSessionId = devauth.citizenSessionId || '';
          setAuth({ ...auth, loggedIn, token, citizen, cineroomIds });
        } else {
          CitizenUserEnvoy.login(
            devauth.username,
            devauth.password,
            devauth.pavilionId,
            async (citizenLoginResponseData) => {
              if (ref.current && ref.current.isLogin()) {
                const loggedIn = ref.current.isLogin();
                const token = ref.current.getToken();
                const citizen = ref.current.getCitizenUser();
                const cineroomIds = ref.current.getCineroomIds() || [];
                const citizenSessionId = ref.current?.getCitizenSessionId();
                setAuth({ ...auth, loggedIn, token, citizen, cineroomIds });
              }
            },
            (loginFailedReason) => {
              const loggedIn = false;
              const token = null;
              const citizen = null;
              const cineroomIds = [];
              const citizenSessionId = null;
              setAuth({ ...auth, loggedIn, token, citizen, cineroomIds });
            },
          );
        }
      }
    }
  }, [ auth ]);

  if (!(development && devauth && devauth.citizen) && ref.current && auth.loggedIn !== ref.current.isLogin()) {
    const loggedIn = ref.current.isLogin();
    const token = ref.current.getToken();
    const citizen = ref.current.getCitizenUser();
    const cineroomIds = ref.current.getCineroomIds() || [];
    setAuth({ ...auth, loggedIn, token, citizen, cineroomIds });
  }

  return (
    <ServantAuthContext.Provider value={auth}>
      {children}
    </ServantAuthContext.Provider>
  );
};

export default ServantAuthProvider;

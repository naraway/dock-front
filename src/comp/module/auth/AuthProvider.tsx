import { CitizenAuthStorage, CitizenUser, CitizenUserEnvoy } from '@nara-way/checkpoint';
import { AxiosInstance } from 'axios';
import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { accessTokenInterceptor, actorIdInterceptor, configureAxios, Interceptor } from '../axiosconfig';

export interface AuthInfo {
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

export interface Auth {
  loggedIn: boolean;
  cineroomIds: string[] | null;
  citizen: CitizenUser | null;
  citizenSessionId: string | null,
  token: { access: string | null, refresh: string | null } | null;
  login: typeof CitizenUserEnvoy.login;
  logout: typeof CitizenUserEnvoy.logout;
  reload: () => void;
}

export const AuthContext = createContext<Auth>({
  loggedIn: false,
  cineroomIds: [],
  citizen: null,
  citizenSessionId: null,
  token: { access: null, refresh: null },
  login: CitizenUserEnvoy.login,
  logout: CitizenUserEnvoy.logout,
  reload: () => {},
});

const AuthProvider = (props: {
  children: ReactNode,
  development: boolean,
  devauth?: AuthInfo,
  interceptors?: Interceptor[],
  axiosInstances?: AxiosInstance[]
}) => {
  const ref = useRef<CitizenAuthStorage | null>(null);
  const { development = false, devauth, children, interceptors, axiosInstances } = props;
  const [ auth, setAuth ] = useState<Auth>({
    loggedIn: false,
    cineroomIds: [],
    token: null,
    citizen: null,
    citizenSessionId: null,
    login: CitizenUserEnvoy.login,
    logout: CitizenUserEnvoy.logout,
    reload: async () => {
      if (ref.current) {
        const loggedIn = ref.current.isLogin();
        const token = ref.current.getToken();
        const citizen = ref.current.getCitizenUser();
        const cineroomIds = ref.current.getCineroomIds();

        setAuth({
          ...auth,
          loggedIn,
          cineroomIds,
          token,
          citizen,
        });
      }
    },
  });

  useEffect(() => {
    const _interceptors = [ accessTokenInterceptor, actorIdInterceptor ];
    if (interceptors) {
      _interceptors.push(...interceptors);
    }
    console.debug('[AuthProvider:useEffect] configure axios, _interceptors =', _interceptors);
    configureAxios(_interceptors, axiosInstances || []);
  }, [ interceptors, axiosInstances ]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = CitizenAuthStorage.instance;
      setAuth({ ...auth });
    }

    // dev only
    if (development && devauth) {
      if (!auth || !auth.loggedIn) {
        if (devauth.citizen) {
          const loggedIn = devauth.loggedIn || true;
          const token = devauth.token || { access: '', refresh: '' };
          const citizen = devauth.citizen || CitizenUser.new();
          const cineroomIds = devauth.cineroomIds || [];
          const citizenSessionId = devauth.citizenSessionId || '';
          setAuth({ ...auth, loggedIn, token, citizen, citizenSessionId, cineroomIds });
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
                setAuth({ ...auth, loggedIn, token, citizen, citizenSessionId, cineroomIds });
                if (citizenSessionId) {
                  CitizenUserEnvoy.startHeartbeat(citizen.pavilionId);
                }
              }
            },
            (loginFailedReason) => {
              const loggedIn = false;
              const token = null;
              const citizen = null;
              const cineroomIds = [];
              const citizenSessionId = null;
              setAuth({ ...auth, loggedIn, token, citizen, citizenSessionId, cineroomIds });
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
    const citizenSessionId = ref.current?.getCitizenSessionId();
    const cineroomIds = ref.current.getCineroomIds();
    setAuth({ ...auth, loggedIn, token, citizen, citizenSessionId, cineroomIds });
    if (ref.current.isLogin() && citizenSessionId) {
      CitizenUserEnvoy.startHeartbeat(citizen.pavilionId);
    }
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

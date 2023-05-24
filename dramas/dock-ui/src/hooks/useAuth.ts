import {
  AuthorizationApi,
  AuthorizationResponse as CheckpointAuthorizationResponse,
  CitizenUserFlowApi,
  CitizenUserSeekApi,
} from '@nara-way/checkpoint-core';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { Auth, AuthorizationResponse, DevAuth, Token } from '../models/auth';
import { authAtom, devAuthAtom, heartbeatAtom } from './stores';
import { parseJwt } from '~/index';

let tokenTimeout;
let heartbeatTimeout;

export const useAuth = () => {
  const [dev, setDev] = useAtom(devAuthAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const [heartbeat, setHeartbeat] = useAtom(heartbeatAtom);
  const { authenticated, user, session, token, workspaces, development } = auth;

  //
  const login = useCallback(
    async (credential: Auth) => {
      const { username, password, pavilionId, location, deviceIp } = credential;

      let response: CheckpointAuthorizationResponse | undefined;
      try {
        response = (
          await AuthorizationApi.issueToken({
            username,
            password,
            pavilionId,
            location,
            deviceIp,
          })
        )?.data;
      } catch (e) {}

      if (!response?.access_token || !response?.refresh_token) {
        throw new Error('Bad credential');
      }

      const { access_token: access, refresh_token: refresh, expires_in: expires } = response;
      setAuth(<Token>{ ...token, access, refresh, refreshed: false });

      return response as AuthorizationResponse;
    },
    [token],
  );

  //
  const logout = useCallback(async () => {
    if (!user) {
      return; // skip when unauthorized
    }

    if (!authenticated || !user?.username) {
      return; // skip when unauthorized
    }

    const { username, pavilionId, additionalInformation } = user;
    const location = additionalInformation?.location ?? undefined;
    const deviceIp = additionalInformation?.device_ip ?? undefined;

    try {
      await CitizenUserFlowApi.logoutCitizenUser({
        username,
        pavilionId,
        citizenSessionId: session,
        location,
        deviceIp,
      });
    } catch (e) {}
    setAuth(<Token>{ access: '', refresh: '', refreshed: true, remembered: false });
  }, [auth]);

  //
  const remember = useCallback(
    (rememberMe: boolean) => {
      if (token.remembered === rememberMe) {
        return;
      }
      setAuth(<Token>{ ...token, remembered: rememberMe });
    },
    [token],
  );

  //
  const refresh = useCallback(async () => {
    if (!auth.token.refresh) {
      return; // skip when unauthorized
    }

    let response;
    try {
      response = (await AuthorizationApi.refreshToken({ refreshToken: auth.token.refresh }))?.data;
    } catch (e) {}

    if (!response?.access_token || !response?.refresh_token) {
      throw new Error('Invalid refresh token');
    }

    const { access_token: access, refresh_token: refresh } = response;
    const authToken = <Token>{ ...token, access, refresh, refreshed: true };
    setAuth(authToken);
  }, [auth]);

  //
  const sendHeartbeat = useCallback(async () => {
    if (development || !authenticated || !token.access || heartbeat <= 0) {
      return; // skip when unauthorized
    }

    await CitizenUserFlowApi.heartbeat({ citizenSessionId: getSessionId(auth.token.access) });

    if (heartbeatTimeout) {
      clearTimeout(heartbeatTimeout);
    }
    heartbeatTimeout = setTimeout(sendHeartbeat, heartbeat * 60 * 1000);
  }, [auth, heartbeat]);

  const _dev_init = useCallback((next: DevAuth) => setDev(next), []);
  const _dev_clear = useCallback(() => {
    setDev(null);
    logout();
  }, []);

  if (dev && !development) {
    setAuth(dev);
  }

  // initiate auth token from refresh token
  if (!dev && !token.access && token.refresh && token.remembered) {
    AuthorizationApi.refreshToken({ refreshToken: auth.token.refresh })
      .then((value) => {
        const response = value?.data;
        if (!response?.access_token || !response?.refresh_token) {
          throw new Error('Invalid refresh token');
        }

        const { access_token: access, refresh_token: refresh } = response;
        const next = <Token>{ ...token, access, refresh, refreshed: true };

        setAuth(next);
      })
      .catch((e) => {
        logout();
        throw new Error('Invalid refresh token');
      });
  }

  useEffect(() => {
    if (development || !authenticated || !token.access) {
      return;
    }

    const exp = getExpires(token.access);
    const now = new Date().getTime();
    const gap = exp - Math.round(now / 1000) - 60 * 5;

    if (gap > 0) {
      if (tokenTimeout) {
        clearTimeout(tokenTimeout);
      }

      tokenTimeout = setTimeout(refresh, gap * 1000);
    } else {
      refresh();
    }

    return () => {
      if (tokenTimeout) {
        clearTimeout(tokenTimeout);
      }
    };
  }, [auth]);

  useEffect(() => {
    if (development || !authenticated || !token.access) {
      return;
    }

    const pavilionId = getPavilionId(token.access);
    const sessionId = getSessionId(token.access);
    if (!pavilionId || !sessionId) {
      return;
    }

    if (!heartbeat) {
      CitizenUserSeekApi.findCitizenUserTimeoutMinutes({ pavilionId })
        .then((response) => setHeartbeat(response?.data?.queryResult))
        .catch((e) => console.log(e.message));
      return;
    }

    if (heartbeat <= 0) {
      return;
    }

    sendHeartbeat();

    return () => {
      if (heartbeatTimeout) {
        clearTimeout(heartbeatTimeout);
      }
    };
  }, [auth, heartbeat]);

  return {
    authenticated,
    user,
    // workspaces,
    // session,
    login,
    logout,
    remembered: token.remembered,
    remember,
    _dev: { init: _dev_init, clear: _dev_clear },
  };
};

//

const getPavilionId = (token: string) => {
  const claims = parseJwt(token);
  return claims['attributes']['pavilion_id'] as string;
};

const getSessionId = (token: string) => {
  const claims = parseJwt(token);
  return claims['attributes']['citizen_session_id'] as string;
};

const getExpires = (token: string) => {
  if (!token || token.split('.').length !== 3) {
    return new Date().getTime();
  }

  const claims = parseJwt(token);
  return claims['exp'] as number;
};

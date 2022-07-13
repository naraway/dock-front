import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiClient } from "@nara-way/prologue";
import { CitizenLoginResponse } from "@nara-way/checkpoint";

export type Interceptor = {
  request?: {
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any
  },
  response?: {
    onFulfilled?: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any
  },
};

export const accessTokenInterceptor: Interceptor = {
  request: {
    onFulfilled: (config) => {
      if (config.url && config.url.includes('/oauth/token')) {
        return config;
      }

      const key = 'nara.accessToken';
      const token = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);

      if (token) {
        if ((console as any).debugging) console.debug('[axiosconfig:Interceptors;accessTokenInterceptor] token exists');
        const Authorization = `Bearer ${token}`;
        const prevHeaders = config.headers || {};
        const headers = { ...prevHeaders, Authorization };
        config.headers = headers;
      } else {
        if ((console as any).debugging) console.debug('[axiosconfig:Interceptors;accessTokenInterceptor] token is empty');
      }
      return config;
    },
  },
  response: {
    onRejected: (error) => {
      // retry interceptor when token expired
      if (error.config && error.response && error.response.status === 401) {
        return refreshToken().then((response) => {
          const result = response.getQueryResult();
          const accessToken = result.accessToken;
          const refreshToken = result.refreshToken;

          window.sessionStorage.setItem('nara.accessToken', accessToken);
          window.localStorage.setItem('nara.accessToken', accessToken);

          window.sessionStorage.setItem('nara.refreshToken', refreshToken);
          window.localStorage.setItem('nara.refreshToken', refreshToken);

          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axios.request(error.config);
        })
      }
    },
  },
};

const refreshToken = async () => {
  const key = 'nara.refreshToken';
  const token = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('nara:narasecret'),
    },
    noAuth: true,
    noCatch: true,
  };

  const data = new FormData();
  data.append('grant_type', 'refresh_token');
  data.append('scope', 'citizen');
  data.append('refresh_token', token || '');

  const oauthClient = new ApiClient('/api/checkpoint');
  return await oauthClient.postNotNull<CitizenLoginResponse>(CitizenLoginResponse, '/oauth/token', data, config);
};

export const actorIdInterceptor: Interceptor = {
  request: {
    onFulfilled: (config) => {
      const key = 'nara.currentActor';
      const currentActor = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);

      if (currentActor) {
        if ((console as any).debugging) console.debug('[axiosconfig:Interceptors;actorIdInterceptor] actorId exists');
        const actorId = JSON.parse(currentActor).id;
        const prevHeaders = config.headers || {};
        const headers = { ...prevHeaders, actorId };
        config.headers = headers;
      } else {
        if ((console as any).debugging) console.debug('[axiosconfig:Interceptors;actorIdInterceptor] actorId is empty');
      }
      return config;
    },
  },
};

export const rolesToHeaderString = (roles: string[]): string => (roles.join(','));

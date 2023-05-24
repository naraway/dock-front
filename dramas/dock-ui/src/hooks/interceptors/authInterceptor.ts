import { Interceptor } from '../../models';

export const authInterceptor: Interceptor = {
  request: {
    onFulfilled: (config) => {
      if (config.url && config.url.includes('/oauth/token')) {
        return config;
      }

      const key = 'nara.token.access';
      const access = window ? window.sessionStorage.getItem(key) ?? window.localStorage.getItem(key) : '';

      if (access) {
        if ((console as any).debugging) {
          console.log(`authInterceptor - apply access token on header, accessToken = ${access}`);
        }
        const Authorization = `Bearer ${access}`;
        const prevHeaders = config.headers ?? {};
        const headers = { ...prevHeaders, Authorization };
        // @ts-ignore
        config.headers = headers;
      } else {
        if ((console as any).debugging) {
          console.log('authInterceptor - no access token exists');
        }
      }

      return config;
    },
  },
};

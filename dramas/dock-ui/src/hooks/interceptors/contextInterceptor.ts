import { DockContext, Interceptor } from '../../models';

export const contextInterceptor: Interceptor = {
  request: {
    onFulfilled: (config) => {
      const key = 'nara.dock.context';
      const value = window ? window.sessionStorage.getItem(key) ?? window.localStorage.getItem(key) : '';
      if (!value) {
        return config;
      }

      const context = JSON.parse(value) as DockContext;

      if (context.actor?.id) {
        if ((console as unknown as any).debugging) {
          console.log(`contextInterceptor - apply session actor on header, actorId = ${context.actor.id}`);
        }
        const prevHeaders = config.headers ?? {};
        const headers = { ...prevHeaders, actorId: context.actor.id };
        // @ts-ignore
        config.headers = headers;
      } else {
        if ((console as any).debugging) {
          console.log('contextInterceptor - no session actor exists');
        }
      }

      return config;
    },
  },
};

import { Interceptor } from '~/models';
import { authInterceptor, configureInterceptors, contextInterceptor } from './index';

export const initInterceptors = (interceptors?: Interceptor[]) => {
  const builtInInterceptors = [authInterceptor, contextInterceptor];
  if (interceptors) {
    builtInInterceptors.push(...interceptors);
  }
  configureInterceptors(builtInInterceptors);

  if ((console as unknown as any).debugging) {
    console.log('initInterceptors - Initialize axios interceptors, interceptors = ', builtInInterceptors);
  }
};

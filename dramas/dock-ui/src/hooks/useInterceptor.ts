import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Interceptor } from '../models';
import { initInterceptors } from './interceptors/initInterceptors';
import { interceptorsAtom } from './stores/inercepter';

export const useInterceptor = () => {
  const [interceptors, setInterceptors] = useAtom(interceptorsAtom);
  const [injected, setInjected] = useState(false);

  const intercept = useCallback((next: Interceptor[]) => setInterceptors(next), []);

  useEffect(() => {
    initInterceptors(interceptors);
    setInjected(true);
  }, [interceptors]);

  return {
    injected,
    intercept,
  };
};

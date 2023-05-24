import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Interceptor } from '../../models';

interface InterceptorUse {
  request?: number;
  response?: number;
}

const globalInterceptor: InterceptorUse = {};
const instancesInterceptors: {
  instance?: typeof axios.interceptors;
  interceptors: InterceptorUse;
}[] = [];

export const configureInterceptors = (interceptors: Interceptor[] = [], axiosInstances?: AxiosInstance[]) => {
  if ((console as unknown as any).debugging) {
    console.log(
      'configureInterceptors - configure axios using',
      'interceptors =',
      interceptors,
      'axiosInstances = ',
      axiosInstances,
    );
  }

  const injected = injectInterceptors(interceptors);
  const { request, response } = injected;

  ejectInterceptor(axios.interceptors, globalInterceptor);
  globalInterceptor.request = axios.interceptors.request.use(request!.onFulfilled, request!.onRejected);
  globalInterceptor.response = axios.interceptors.response.use(response!.onFulfilled, response!.onRejected);

  instancesInterceptors.forEach((instancesInterceptor) => {
    if (instancesInterceptor.instance) {
      ejectInterceptor(instancesInterceptor.instance, instancesInterceptor.interceptors);
    }
  });

  instancesInterceptors.splice(0, interceptors.length);
  if (axiosInstances) {
    for (const _axios of axiosInstances) {
      const instance = _axios.interceptors;
      const requestId = _axios.interceptors.request.use(request!.onFulfilled, request!.onRejected);
      const responseId = _axios.interceptors.response.use(response!.onFulfilled, response!.onRejected);

      instancesInterceptors.push({
        instance,
        interceptors: { request: requestId, response: responseId },
      });
    }
  }
};

const injectInterceptors = (interceptors: Interceptor[] = []): Interceptor => {
  const onReqFulfilled = async (config: Parameters<typeof axios.interceptors.request.use>[0]) => {
    for (let i = 0; i < interceptors.length; i++) {
      const req = interceptors[i].request;
      if (req) {
        // @ts-ignore
        config = req.onFulfilled ? await req.onFulfilled(config) : config;
      }
    }
    return config;
  };
  const onReqRejected = async (error: any) => {
    for (let i = 0; i < interceptors.length; i++) {
      const req = interceptors[i].request;
      if (req) {
        error = req.onRejected ? await req.onRejected(error) : error;
      }
    }
    return Promise.reject(error);
  };

  const onResFulfilled = async (config: AxiosResponse) => {
    for (let i = 0; i < interceptors.length; i++) {
      const res = interceptors[i].response;
      if (res) {
        config = res.onFulfilled ? await res.onFulfilled(config) : config;
      }
    }
    return config;
  };

  const onResRejected = async (error) => {
    for (let i = 0; i < interceptors.length; i++) {
      const res = interceptors[i].response;
      if (res) {
        error = res.onRejected ? await res.onRejected(error) : error;
      }
    }
    return Promise.reject(error);
  };

  return {
    request: {
      // @ts-ignore
      onFulfilled: onReqFulfilled,
      onRejected: onReqRejected,
    },
    response: {
      onFulfilled: onResFulfilled,
      onRejected: onResRejected,
    },
  };
};

const ejectInterceptor = (interceptors: typeof axios.interceptors, id: InterceptorUse) => {
  if ((console as unknown as any).debugging) {
    console.log(`ejectInterceptor - eject previous interceptors, id = ${id}`);
  }

  if (id.request) {
    interceptors.request.eject(id.request);
  }
  if (id.response) {
    interceptors.request.eject(id.response);
  }
};

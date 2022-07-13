import { axiosApi } from '@nara-way/prologue';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Interceptor } from './Interceptors';

interface InterceptorUse {
  request: number | undefined,
  response: number | undefined,
}

const globalInterceptor: InterceptorUse = { request: undefined, response: undefined };
const prologueInterceptor: InterceptorUse = { request: undefined, response: undefined };
const instancesInterceptors: {
  instance: typeof axios.interceptors | undefined,
  interceptors: InterceptorUse,
}[] = [];

const configureAxios = (interceptors: Interceptor[] = [], axiosInstances?: AxiosInstance[]) => {
  if ((console as any).debugging) console.debug('[configureAxios:configureAxios] configure axios using',
    ' interceptors =', interceptors, 'axiosInstances = ', axiosInstances);
  const integrated: Interceptor = integrateInterceptors(interceptors);
  const { request, response } = integrated;

  // global
  ejectInterceptors(axios.interceptors, globalInterceptor);
  globalInterceptor.request = axios.interceptors.request.use(request!.onFulfilled, request!.onRejected);
  globalInterceptor.response = axios.interceptors.response.use(response!.onFulfilled, response!.onRejected);

  // prologue
  ejectInterceptors(axiosApi.interceptors, prologueInterceptor);
  prologueInterceptor.request = axiosApi.interceptors.request.use(request!.onFulfilled, request!.onRejected);
  prologueInterceptor.response = axiosApi.interceptors.response.use(response!.onFulfilled, response!.onRejected);

  // additional instances
  instancesInterceptors.forEach(instancesInterceptor => {
    if (instancesInterceptor.instance) {
      ejectInterceptors(instancesInterceptor.instance, instancesInterceptor.interceptors);
    }
  });
  instancesInterceptors.splice(0, instancesInterceptors.length);
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

const ejectInterceptors = (interceptors: typeof axios.interceptors, id: InterceptorUse) => {
  if ((console as any).debugging) console.debug('[configureAxios:ejectInterceptors] eject previous interceptors, id =', id);
  if (id.request) {
    interceptors.request.eject(id.request);
  }
  if (id.response) {
    interceptors.request.eject(id.response);
  }
};

const integrateInterceptors = (interceptors: Interceptor[] = []): Interceptor => {
  const onReqFulfilled = async (config: AxiosRequestConfig) => {
    for (let i = 0; i < interceptors.length; i++) {
      const req = interceptors[i].request;
      if (req) {
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
      onFulfilled: onReqFulfilled,
      onRejected: onReqRejected,
    },
    response: {
      onFulfilled: onResFulfilled,
      onRejected: onResRejected,
    },
  };
};

export default configureAxios;

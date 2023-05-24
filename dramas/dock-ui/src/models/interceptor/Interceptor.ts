import axios from 'axios';

export interface Interceptor {
  request?: {
    onFulfilled?: Parameters<typeof axios.interceptors.request.use>[0];
    onRejected?: Parameters<typeof axios.interceptors.request.use>[1];
  };
  response?: {
    onFulfilled?: Parameters<typeof axios.interceptors.response.use>[0];
    onRejected?: Parameters<typeof axios.interceptors.response.use>[1];
  };
}

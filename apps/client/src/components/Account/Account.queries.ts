import axios, { AxiosRequestConfig } from 'axios';
import { useStorageStore } from '../../lib/store';
import _ from 'lodash'

export const axiosClient = axios.create();

const refresh = (config: AxiosRequestConfig = {}) => {
  const token = useStorageStore.getState().token;
  if (token && 'refreshToken' in token) {
    config.headers = {
      ...config.headers,
      Authorization: token.refreshToken,
    };
    return axios.get('/api/auth/refresh', config);
  } else {
    return Promise.reject();
  }
};

const login = (
  provider: 'guest' | 'google' = 'guest',
  config: AxiosRequestConfig = {},
) => {
  return axios.get(`/api/auth/${provider}/login`, config);
};

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      axios.isAxiosError(error) &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest.url.includes('login') &&
      !originalRequest.url.includes('logout') &&
      !originalRequest.url.includes('refresh') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const setToken = useStorageStore.getState().setToken;

      try {
        const tokens = await refresh();
        setToken(tokens.data);
        originalRequest.headers.Authorization = `Bearer ${tokens.data.accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
      }
      try {
        const tokens = await login();
        setToken(tokens.data);
        originalRequest.headers.Authorization = `Bearer ${tokens.data.guestToken}`;
        return axiosClient(originalRequest);
      } catch (guestLoginError) {
        console.error('Guest login failed:', guestLoginError);
      }
    }
    return Promise.reject(error);
  },
);

const me = (config: AxiosRequestConfig = {}) => {
  const token = useStorageStore.getState().token;
  if (token === null) {
    /* empty */
  } else if (_.has(token,'accessToken')){
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token.accessToken}`,
    };
  } else if (_.has(token,'guestToken')) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token.guestToken}`,
    };
  }
  return axiosClient.get('/api/auth/me', config);
};

export { login, me };

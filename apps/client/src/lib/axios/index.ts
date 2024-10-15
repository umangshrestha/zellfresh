import axios, { AxiosRequestConfig } from 'axios';

export const axiosClient = axios.create();

export const logout = (config: AxiosRequestConfig | undefined = undefined) =>
  axios.get('/api/auth/logout', config);

export const refresh = (config?: AxiosRequestConfig) =>
  axios.get('/api/auth/refresh', config);

export const login = (
  provider: 'guest' | 'google' = 'guest',
  config?: AxiosRequestConfig,
) => axios.get(`/api/auth/${provider}/login`, config);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status !== 401 &&
      !originalRequest.url.includes('login') &&
      !originalRequest.url.includes('logout') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refresh();
        return axiosClient(originalRequest);
      } catch (refreshError) {
        try {
          await logout();
          await login();
        } catch (guestLoginError) {
          console.error('Guest login failed:', guestLoginError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const me = (config?: AxiosRequestConfig) =>
  axiosClient.get('/api/auth/me', config);

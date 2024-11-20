import axios, { AxiosRequestConfig } from 'axios';

export const axiosClient = axios.create();

const logout = (config: AxiosRequestConfig | undefined = undefined) => {
  return axios.get('/api/auth/logout', config);
}

const refresh = (config?: AxiosRequestConfig) => {
  return axios.get('/api/auth/refresh', config);
}

const login = (
  provider: 'guest' | 'google' = 'guest',
  config?: AxiosRequestConfig,
) => {
  return axios.get(`/api/auth/${provider}/login`, config);
}

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
      try {
        await refresh();
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
      }
      try {
        await logout();
        await login();
      } catch (guestLoginError) {
        console.error('Guest login failed:', guestLoginError);
      }

    }
    return Promise.reject(error);
  },
);

const me = (config?: AxiosRequestConfig) => {
  return axiosClient.get('/api/auth/me', config);
}


export {
  login,
  logout,
  me,
};
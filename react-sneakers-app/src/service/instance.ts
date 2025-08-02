import axios from 'axios';
import qs from 'qs';
import type { AuthResponse } from './model';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' })
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 410 && error.config && !error.config._retry) {
      try {
        error.config._retry = true;
        const response = await axiosInstance.put<AuthResponse>(
          '/auth/refresh-token',
        );
        localStorage.setItem('token', response.data.token);
        return axiosInstance.request(originalRequest);
      } catch (err) {
        console.error('token is expired and can not be refreshed', err);
      }
    }
    throw error;
  },
);

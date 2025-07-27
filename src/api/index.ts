import axios from 'axios';
import { tokenStorage } from '../utils/token';

const http = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  get<T>(url: string, config = {}) {
    return http.get<T>(url, config).then(res => res.data);
  },
  post<T>(url: string, data?: any, config = {}) {
    return http.post<T>(url, data, config).then(res => res.data);
  },
  put<T>(url: string, data?: any, config = {}) {
    return http.put<T>(url, data, config).then(res => res.data);
  },
  delete<T>(url: string, config = {}) {
    return http.delete<T>(url, config).then(res => res.data);
  },
};

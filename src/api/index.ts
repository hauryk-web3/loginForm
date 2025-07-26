import http from './http';
import { apiRequest } from './client';

export const api = {
  get<T>(url: string, config = {}) {
    return apiRequest<T>(http.get(url, config));
  },

  post<T>(url: string, data?: any, config = {}) {
    return apiRequest<T>(http.post(url, data, config));
  },

  put<T>(url: string, data?: any, config = {}) {
    return apiRequest<T>(http.put(url, data, config));
  },

  delete<T>(url: string, config = {}) {
    return apiRequest<T>(http.delete(url, config));
  },
};

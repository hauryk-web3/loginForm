import axios from 'axios';
import { tokenStorage } from '../utils/token';
import { useAuthStore } from '../store/auth';
import { router } from '../router/index';

const http = axios.create({
  baseURL: import.meta.env.VITE_USER_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// === Access Token
http.interceptors.request.use(config => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === Refresh Logic
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
}

http.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(http(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_USER_API}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = response.data.accessToken;
        tokenStorage.set(newToken);

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        const auth = useAuthStore();
        auth.logout();
        router.push('/login');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

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

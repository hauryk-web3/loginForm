import { api } from './index';

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface VerifyPayload {
  email: string;
  code: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface resetPasswordPayload {
  token: string;
  newPassword: string;
}

export const authApi = {
  register(payload: RegisterPayload) {
    return api.post('/auth/register', payload);
  },
  verify(payload: VerifyPayload) {
    return api.post('/auth/verify', payload);
  },
  login(payload: LoginPayload) {
    return api.post('/auth/login', payload);
  },
  me() {
    return api.get('/auth/me');
  },
  forgotPassword(payload: ForgotPasswordPayload) {
    return api.post('/auth/forgot-password', payload);
  },
  resetPasswrod(payload: resetPasswordPayload) {
    return api.post('/auth/reset-password', payload);
  },
};

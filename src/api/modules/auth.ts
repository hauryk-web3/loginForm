import { api } from '../index';

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

export const register = (payload: RegisterPayload) => {
  return api.post('/auth/register', payload);
};

export const verify = (payload: VerifyPayload) => {
  return api.post('/auth/verify', payload);
};

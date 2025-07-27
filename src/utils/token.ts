const ACCESS_TOKEN_KEY = 'access_token';

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
};

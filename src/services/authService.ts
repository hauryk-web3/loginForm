export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const res = await fetch(`${import.meta.env.VITE_USER_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }

  return await res.json();
};

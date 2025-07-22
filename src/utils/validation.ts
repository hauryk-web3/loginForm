export const validateFirstName = (value: string): string =>
  value.trim() ? '' : 'First name is required';

export const validateLastName = (value: string): string =>
  value.trim() ? '' : 'Last name is required';

export const validateEmail = (value: string): string => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!value.trim()) return 'Email is required';
  if (!emailRegex.test(value)) return 'Invalid email';
  return '';
};

export const validatePassword = (value: string): string =>
  value.length >= 6 ? '' : 'Password must be at least 6 characters';

export const validateConfirmPassword = (password: string, confirm: string): string =>
  confirm === password ? '' : 'Passwords do not match';

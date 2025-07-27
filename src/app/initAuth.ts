import { useAuthStore } from '../store/auth';
import { tokenStorage } from '../utils/token';

export async function initAuth() {
  const auth = useAuthStore();
  const token = tokenStorage.get();

  if (token) {
    await auth.fetchUser();
  }
}

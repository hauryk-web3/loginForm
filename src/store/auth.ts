import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from '../api/services';
import { tokenStorage } from '../utils/token';

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  async function fetchUser() {
    try {
      const data = await api.auth.me();
      user.value = data;
    } catch (e) {
      tokenStorage.clear();
      user.value = null;
    }
  }

  function logout() {
    tokenStorage.clear();
    user.value = null;
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    logout,
  };
});

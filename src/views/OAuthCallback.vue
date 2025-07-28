<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { tokenStorage } from '../utils/token';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

onMounted(async () => {
  const token = route.query.access_token as string;

  if (token) {
    tokenStorage.set(token);
    await auth.fetchUser();
    router.replace({ path: '/dashboard' });
  } else {
    router.replace({ path: '/login' });
  }
});
</script>

<template>
  <div>Загрузка...</div>
</template>

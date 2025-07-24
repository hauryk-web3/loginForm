// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../components/RegistrationForm.vue';
import VerifyEmailView from '../components/VerifyEmailView.vue';

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: VerifyEmailView,
    props: route => ({ email: route.query.email as string }),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/RegisterView.vue';
import VerifyEmailView from '../views/VerifyEmailView.vue';
import LoginView from '../views/LoginView.vue';
import RootTemp from '../components/RootTemp.vue';
import AuthLayout from '../layouts/AuthLayout.vue';

const routes = [
  {
    path: '/',
    name: 'root',
    component: RootTemp,
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
      },
      {
        path: 'verify-email',
        name: 'verify-email',
        component: VerifyEmailView,
        props: route => ({ email: route.query.email as string }),
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

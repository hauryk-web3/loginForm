import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/RegisterView.vue';
import VerifyEmailView from '../views/VerifyEmailView.vue';
import LoginView from '../views/LoginView.vue';
import RootTemp from '../components/RootTemp.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import TestDashboard from '../components/TestDashboard.vue';
import OAuthCallback from '../views/OAuthCallback.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  {
    path: '/',
    name: 'root',
    component: RootTemp,
  },
  {
    path: '/dashboard',
    name: 'root',
    component: TestDashboard,
    meta: { requiresAuth: true },
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
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordView,
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: ResetPasswordView,
        props: route => ({ token: route.query.token as string }),
      },
      {
        path: '/oauth/callback',
        name: 'oauth-callback',
        component: OAuthCallback,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  console.log('here', auth.isAuthenticated);

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ path: '/login' });
  }

  next();
});

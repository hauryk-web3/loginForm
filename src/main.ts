import { createApp } from 'vue';
import App from './App.vue';
import './styles/main.scss';
import i18n from './plugins/i18n';
import { createPinia } from 'pinia';
import { initAuth } from './app/initAuth';

import { router } from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);

await initAuth();

app.use(router);

app.mount('#app');

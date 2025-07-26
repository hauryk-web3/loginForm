import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'
import i18n from './plugins/i18n'

import { router } from './router'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')

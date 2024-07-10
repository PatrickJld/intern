import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue3-cookies'
import './utilities/axios'

const app = createApp(App)
    .use(router)
    .use(store)
    .use(VueCookies)
    .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'


const app = createApp(App);

app.config.globalProperties.$gateway = "192.168.0";

app.use(router)

app.mount('#app')

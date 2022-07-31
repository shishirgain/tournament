import { createApp } from 'vue'
import { createPinia } from "pinia";
import './assets/main.css'
import './assets/custom.css'
import App from './App.vue'
import router from './router'

import { registerStore } from "./store";

const app = createApp(App)
app.use(createPinia());
registerStore();

app.use(router)
app.mount('#app')

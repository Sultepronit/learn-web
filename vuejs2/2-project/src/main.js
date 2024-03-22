import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// createApp(App).mount('#app')

const app = createApp(App);
app.use(Toast);
app.mount('#app');

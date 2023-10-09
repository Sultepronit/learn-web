//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

//createApp(App).mount('#app')

app.config.errorHandler = (err) => {
    console.warn(err);
}

//This makes the TodoDeleteButton available for use anywhere in our app
//app.component('TodoDeleteButton', TodoDeleteButton)


app.mount('#app');

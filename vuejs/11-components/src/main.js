import { createApp } from 'vue';
import App from './App.vue';
// npm i sass --save-dev
//import Greeting from '@/components/Greeting.vue';

const vm = createApp(App);

// global use
//vm.component('Greeting', Greeting);

vm.mount('#app');

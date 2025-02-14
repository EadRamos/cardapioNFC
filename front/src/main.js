import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import axios from './services/api.js';
import { createPinia } from 'pinia';
import piniaPersistedState from "pinia-plugin-persistedstate";

import authStore from './store/auth.js';

import './style.css';

import MenuMobile from '@/components/manus/MenuMobile.vue';

//window.axios = axios;

// varivel global para interface mobile
// window.mobile = /Mobi|Android|Iphone/.test(navigator.userAgent);

const app = createApp(App);
app.use(router);
app.use(createPinia().use(piniaPersistedState));

app.config.globalProperties.axios = axios;
app.config.globalProperties.mobile = /Mobi|Android|Iphone/.test(navigator.userAgent);
app.config.globalProperties.pinia = authStore();

app.component('menu-mobile', MenuMobile);

if(localStorage.getItem('modo')) document.getElementById('app').classList.add('dark');
app.mount('#app');
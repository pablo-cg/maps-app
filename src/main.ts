import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import mapboxgl from 'mapbox-gl';

import './assets/main.css';
import 'mapbox-gl/dist/mapbox-gl.css';

if (!navigator.geolocation) {
  throw new Error('Tu navegador web no soporta la Geolocalización');
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount('#app');

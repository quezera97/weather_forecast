import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n/i18n.js';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createRouter, createWebHistory } from 'vue-router';

import WeatherForecast from './views/WeatherForecast.vue';
import MapCoordinate from './views/MapCoordinate.vue';
import PrayerTime from './views/PrayerTime.vue';

const routes = [
    { path: '/', component: WeatherForecast },
    { path: '/map-coordinate', component: MapCoordinate },
    { path: '/prayer-time', component: PrayerTime },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');

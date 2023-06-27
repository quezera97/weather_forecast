import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import WeatherForecast from './views/WeatherForecast.vue';
import MapCoordinate from './views/MapCoordinate.vue';
import PrayerTime from './views/PrayerTime.vue';

const router = new VueRouter({
  routes: [
    { path: '/', component: WeatherForecast },
    { path: '/map-coordinate', component: MapCoordinate },
    { path: '/prayer-time', component: PrayerTime },
  ]
});

export default router;
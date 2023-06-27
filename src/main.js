import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n/i18n.js';
import router from './router.js';

import vuetify from './plugins/vuetify';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  router,
  VueSweetalert2,
  render: h => h(App)
}).$mount('#app')

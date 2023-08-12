import Vue from 'vue';
import App from './App.vue';
import i18n from './i18n/i18n.js';
import router from './router.js';

import vuetify from './plugins/vuetify';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//to do global styling
// const options = {
//   confirmButtonColor: '#41b882',
//   cancelButtonColor: '#ff7674',
// };

// Vue.use(VueSweetalert2, options);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  i18n,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

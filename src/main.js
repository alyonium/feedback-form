import Vue from 'vue';
import VueMask from 'v-mask';
import App from './App';
import vuetify from './plugins/vuetify';

Vue.use(VueMask);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

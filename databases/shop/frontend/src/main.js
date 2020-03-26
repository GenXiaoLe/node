import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue'
import router from './router';
import http from './api/index';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(http);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

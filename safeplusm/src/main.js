// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(axios);
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

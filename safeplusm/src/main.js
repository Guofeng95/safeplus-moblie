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
router.beforeEach((to, from, next) => {
     var flag = IsPC();
     var href=window.location.href;
     console.log()
     if(flag){
     	
  		window.location.href=href.replace(/m.secjia.com/,"toutiao.secjia.com")
     	
     }else{
     	next();
     }

     
})
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

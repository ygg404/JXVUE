import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import {setCookie, getCookie, delCookie} from './cookie.js'
import elCascaderMulti from "el-cascader-multi";

Vue.prototype.$cookieStore = {
  getCookie,
  setCookie,
  delCookie
}
Vue.use(elCascaderMulti);
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

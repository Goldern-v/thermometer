import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import '@/styles/index.scss' // global css

import axios from 'axios'
Vue.prototype.$http = axios
console.log('dddddddddddddd');
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

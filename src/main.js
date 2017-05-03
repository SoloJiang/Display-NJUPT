/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

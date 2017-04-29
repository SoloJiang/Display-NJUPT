/**
 * Created by solojiang on 2017/4/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    component: Home
  }]
})

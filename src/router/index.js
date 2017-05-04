/**
 * Created by solojiang on 2017/4/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/Home'
import profile from 'pages/Profile'
import museumAdvice from 'pages/museumAdvice'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/profile',
      component: profile
    },
    {
      path: '/advice',
      component: museumAdvice
    }
  ]
})

/**
 * Created by solojiang on 2017/4/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Advice from 'pages/Advice'
import Guide from 'pages/Guide'
import Essence from 'pages/Essence'
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
      component: Profile
    },
    {
      path: '/advice',
      component: Advice
    },
    {
      path: '/guide',
      component: Guide
    },
    {
      path: '/essence',
      component: Essence
    }
  ]
})

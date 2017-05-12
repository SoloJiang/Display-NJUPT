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
import Hall from 'pages/Hall'
import Tourism from 'pages/Tourism'
import Overview from 'pages/Overview'
import Donate from 'pages/Donate'
import HallSelect from 'pages/HallSelect'
import CitySelect from 'pages/CitySelect'

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
      path: '/index',
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
    },
    {
      path: '/hall',
      component: Hall
    },
    {
      path: '/tourism',
      component: Tourism
    },
    {
      path: '/overview',
      component: Overview
    },
    {
      path: '/donate',
      component: Donate
    },
    {
      path: '/hallselect',
      component: HallSelect
    },
    {
      path: '/cityselect',
      component: CitySelect
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

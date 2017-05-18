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
import Intro from 'pages/Intro'
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
      path: '/feedback',
      component: Advice
    },
    {
      path: '/guide',
      component: Guide
    },
    {
      path: '/exhibit',
      component: Essence
    },
    {
      path: '/hall_lists',
      component: Hall
    },
    {
      path: '/news',
      component: Tourism
    },
    {
      path: '/intro',
      component: Intro
    },
    {
      path: '/donate',
      component: Donate
    },
    {
      path: '/checkExhibition',
      component: HallSelect
    },
    {
      path: '/cityselect',
      component: CitySelect
    },
    {
      path: '/news_detail/:id',
      component: Guide
    },
    {
      path: '/exhibit_detail',
      component: Guide
    },
    {
      path: '/hall_detail',
      component: Guide
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

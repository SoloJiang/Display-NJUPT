/**
 * Created by solojiang on 2017/4/30.
 */
import Vue from "vue";
import Router from "vue-router";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Advice from "pages/Advice";
import Guide from "pages/Guide";
import QRCode from "pages/QRCode";
import Essence from "pages/Essence";
import Hall from "pages/Hall";
import Tourism from "pages/Tourism";
import Intro from "pages/Intro";
import Donate from "pages/Donate";
import HallSelect from "pages/HallSelect";
import CitySelect from "pages/CitySelect";
import Order from "pages/Order";
import Search from "pages/Search";
import Overview from "pages/Overview";
import ShopOrder from "pages/ShopOrder";
import OrderDetail from "pages/OrderDetail";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/index",
      component: Home
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "/feedback",
      component: Advice
    },
    {
      path: "/guide",
      component: Guide
    },
    {
      path: "/exhibit",
      component: Essence
    },
    {
      path: "/hall_lists",
      component: Hall
    },
    {
      path: "/news",
      component: Tourism
    },
    {
      path: "/intro",
      component: Intro
    },
    {
      path: "/donate",
      component: Donate
    },
    {
      path: "/checkExhibition",
      component: HallSelect
    },
    {
      path: "/cityselect",
      component: CitySelect
    },
    {
      path: "/news_detail/:id",
      component: Guide
    },
    {
      path: "/exhibit_detail",
      component: Guide
    },
    {
      path: "/hall_detail",
      component: Guide
    },
    {
      path: "/QRCode",
      component: QRCode
    },
    {
      path: "/Order",
      component: Order
    },
    {
      path: "/exhibit_lists",
      component: Essence
    },
    {
      path: "/exhibit_search",
      component: Search
    },
    {
      path: "/global_news",
      component: Overview
    },
    {
      path: "/shoporder",
      component: ShopOrder
    },
    {
      path: "/order_detail",
      component: OrderDetail
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

<template>
  <div id="tourism">
    <div class="navbar">
      <ul>
        <li @click="all" class="nav-item active"><span class="desc">全部</span></li>
        <li @click="news" class="nav-item"><span class="desc">旅游资讯</span></li>
        <li @click="hotSpots" class="nav-item"><span class="desc">旅游热点</span></li>
        <li @click="information" class="nav-item"><span class="desc">旅游信息</span></li>
      </ul>
    </div>
    <div class="info-wrapper" ref="infoWrapper">
      <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        class="fade-group"
      >
        <li v-for="(item, index) in computedList" :key="item" :data-index="index" class="info-item">
          <img :src="item">
          <div class="text-wrapper">
            <p>轻扫落叶 漫步山林</p>
            <p>发布时间：2017-04-25</p>
            <p>22:06:40</p>
          </div>
        </li>
      </transition-group>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  import BScroll from 'better-scroll'
  import Velocity from 'velocity-animate'
  export default {
    name: 'tourism',
    data () {
      return {
        imgs: [],
        selectList: 'tourism',
        navList: document.getElementsByClassName('nav-item')
      }
    },
    computed: {
      computedList: function () {
        let vm = this
        return this.imgs.filter(function (item) {
          return item.indexOf(vm.selectList) !== -1
        })
      }
    },
    methods: {
      all: function () {
        this.selectList = 'tourism'
        this.activeNavItem(0)
      },
      news: function () {
        this.selectList = 'tourism-1'
        this.activeNavItem(1)
      },
      hotSpots: function () {
        this.selectList = 'tourism-2'
        this.activeNavItem(2)
      },
      information: function () {
        this.selectList = 'tourism-3'
        this.activeNavItem(3)
      },
      activeNavItem: function (index) {
        for (let i = 0; i < this.navList.length; i++) {
          this.navList[i].classList.remove('active')
        }
        this.navList[index].classList.add('active')
      },

      // animate methods
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        let delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: '130px' },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        let delay = el.dataset.index * 150
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      }
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '旅游信息查询'
      let img1 = require('assets/pageTourism/tourism-1.jpg')
      let img2 = require('assets/pageTourism/tourism-2.jpg')
      let img3 = require('assets/pageTourism/tourism-3.jpg')
      this.imgs = [img1, img2, img3, img1, img2, img3]

      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.infoWrapper, {
          click: true
        })
      })
    },
    components: {
      'v-footer': footer
    }
  }
</script>

<style lang="sass" scoped>
  #tourism
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 60% no-repeat fixed
    background-size: 300% 120%
    .navbar
      height: 40px
      background: rgb(235, 215, 185)
      ul
        display: flex
        justify-content: space-around
        align-items: center
        .nav-item
          padding: 9px 0
          width: calc(100% / 4)
          list-style-type: none
          color: rgb(125, 124, 122)
          text-align: center
          &.active
            color: rgb(116, 57, 41)
          &:last-child
            .desc
              border: 0
          .desc
            display: inline-block
            width: 100%
            box-sizing: border-box
            border-right: 1px solid rgb(177, 167, 152)
    .info-wrapper
      max-height: calc(100vh - 40px - 50px)
      overflow: hidden
      .info-item
        display: flex
        margin-bottom: 10px
        width: 100%
        height: 130px
        align-items: center
        background: rgba(7, 17, 27, 0.3)
        img
          margin-left: 1vh
          height: 92%
        .text-wrapper
          margin-left: 1.5vh
          color: #fff
          p
            margin-bottom: 0.5vh
</style>

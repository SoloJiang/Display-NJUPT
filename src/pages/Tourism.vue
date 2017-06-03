<template>
  <div id="tourism">
    <div class="navbar">
      <ul>
        <li class="nav-item" v-for="(item, index) in list" v-bind:class="{ active: activeId === index }"><span class="desc" @click="tabItem(index, item.id)">{{item.title}}</span></li>
      </ul>
    </div>
    <div class="info-wrapper" ref="infoWrapper" @scroll="getMore">
      <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
        class="fade-group"
      >
        <li v-for="(item, index) in imgs" :key="item" :data-index="index" class="info-item" @click="routerGo(item.id)">
          <img :src="baseUrl+item.thumb">
          <div class="text-wrapper">
            <p>{{item.title}}</p>
            <br>
            <p>发布时间：{{item.createTime}}</p>
          </div>
        </li>
      </transition-group>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  import Velocity from 'velocity-animate'
  export default {
    name: 'tourism',
    data () {
      return {
        imgs: [],
        list: [{id: '0', title: '全部'}],
        navList: document.getElementsByClassName('nav-item'),
        baseUrl: this._Global.url,
        p: 1,
        activeId: 0,
        totalnum: 0,
        flag: true
      }
    },
    methods: {
      tabItem (index, id) {
        this.activeId = index
        this.p = 1
        this.totalnum = 0
        this.getInfo(this.p, 6, id)
      },
      // animate methods
      beforeEnter: function (el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter: function (el, done) {
        let delay = el.dataset.index * 10
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, height: '130px' },
            { complete: done }
          )
        }, delay)
      },
      leave: function (el, done) {
        let delay = el.dataset.index * 10
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
          )
        }, delay)
      },
      getInfo (p, num = 6, catId, more) {
        let exhibitionId = this.$route.query.exhibition_id
        this.$http.get(`News/lists?exhibition_id=${exhibitionId}&cat_id=${catId}&p=${p}&num=${num}`)
          .then(res => {
            if (res.data.constructor === Array) {
              this.totalnum = window.sessionStorage.getItem('totalNum')
              if (!more) {
                this.imgs = res.data
              } else {
                this.imgs = this.imgs.concat(res.data)
                this.p = this.p + 1
                this.flag = true
              }
            } else {
              this.totalnum = 0
              this.imgs = []
            }
          })
      },
      getMore () {
        let that = this
        let container = this.$refs.infoWrapper
        if (container) {
          let scrollMax = container.scrollHeight
          if (that.flag && that.p * 6 < that.totalnum && scrollMax - container.scrollTop < 520) {
            this.flag = false
            this.getInfo(that.p, 6, this.list[this.activeId].id, true)
          }
        }
      },
      routerGo (id) {
        this.$router.push(`/news_detail/${id}`)
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      this.getInfo(1, 6, 0)
      let exhibitionId = this.$route.query.exhibition_id
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
      this.$http.get(`News/getCat?exhibition_id=${exhibitionId}`)
        .then(res => {
          this.list = this.list.concat(res.data)
        })
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
        width: 100%
        flex-direction: column
        flex-wrap: wrap
        overflow-x: auto
        height: 40px
        -webkit-overflow-scrolling: touch
        .nav-item
          padding: 9px 0
          width: 100px
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
      overflow: scroll
      font-size: 14px
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
          width: 180px
        .text-wrapper
          margin-left: 1.5vh
          color: #fff
          p
            margin-bottom: 0.5vh
</style>

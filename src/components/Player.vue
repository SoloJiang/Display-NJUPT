<template>
  <div class="player">
    <div class="imgs" ref="imgList">
      <img v-for="(item, index) in banners" :key="index" :src="baseUrl+item.thumb" class="img"
           @touchstart="getClientX($event)" @touchmove="moveList($event)" @touchend="endMove()" @click = "routerGo(item.url)"/>
    </div>
    <ul class="img-btns" ref="ulList" @touchstart="changeIndex($event)" @click="changeIndex($event)">
      <li v-for="(item, index) in banners" :key="index" class="img-btn" :class="{active: index === activeIndex}"></li>
    </ul>
  </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */
  export default {
    data () {
      return {
        activeIndex: 0,
        timeout: null,
        clientX: null,
        clientWidth: null,
        changeX: null
      }
    },
    props: {
      banners: {
        type: Array,
        default: []
      },
      baseUrl: {
        type: String
      }
    },
    methods: {
      slider () {
        let imgList = this.$refs.imgList
        let translateX
        let len = this.banners.length
        if (this.activeIndex + 1 === len) {
          translateX = 0
          this.activeIndex = 0
        } else {
          this.activeIndex++
          translateX = -this.activeIndex * this.clientWidth
        }
        if (imgList) {
          imgList.style.transform = `translate3d(${translateX}px, 0, 0)`
        }
      },
      timeCount () {
        this.timeout = setTimeout(() => {
          let imgList = this.$refs.imgList
          if (imgList) {
            imgList.classList.add('img-transition')
          }
          this.slider()
          this.timeCount()
        }, 3000)
      },
      changeIndex (e) {
        let index
        let target = e.target
        if (target.localName === 'li') {
          this.$refs.ulList.childNodes.forEach((item, Index) => {
            if (item === e.target) {
              index = Index
            }
          })
          if (this.activeIndex !== index) {
            clearTimeout(this.timeout)
            this.activeIndex = index
            this.$refs.imgList.classList.add('img-transition')
            let imgList = this.$refs.imgList
            let translateX = -this.activeIndex * this.clientWidth
            imgList.style.transform = `translate3d(${translateX}px, 0, 0)`
            this.timeCount()
          }
        }
      },
      getClientX (e) {
        clearTimeout(this.timeout)
        this.$refs.imgList.classList.remove('img-transition')
        this.clientX = e.touches[0].clientX
      },
      moveList (e) {
        let changeX = this.clientX - e.touches[0].clientX
        this.changeX = changeX
        let translateX = -this.activeIndex * this.clientWidth - changeX
        let imgList = this.$refs.imgList
        imgList.style.transform = `translate3d(${translateX}px, 0, 0)`
      },
      endMove () {
        let imgList = this.$refs.imgList
        imgList.classList.add('img-transition')
        if (this.changeX > 0 && this.activeIndex !== this.banners.length - 1) {
          this.activeIndex++
        } else if (this.changeX < 0 && this.activeIndex !== 0) {
          this.activeIndex--
        }
        let translateX = -this.activeIndex * this.clientWidth
        imgList.style.transform = `translate3d(${translateX}px, 0, 0)`
        this.timeCount()
      },
      routerGo (url) {
        if (url.length !== 0) {
          window.location = url
        }
      }
    },
    created () {},
    mounted () {
      this.clientWidth = this.$refs.imgList.clientWidth
      this.timeCount()
    }
  }</script>

<style lang="sass" scoped>
  .player
    position: relative
    overflow: hidden
    .imgs
      max-width: 100%
      height: 36vh
      white-space: nowrap
    .img-transition
      transition: all .5s
    .img
      width: 100%
      height: 100%
    .img-btns
      display: table-cell
      position: absolute
      bottom: 10px
      width: 100%
      text-align: center
      -webkit-tap-highlight-color: transparent
    .img-btn
      display: inline-block
      margin-left: 8px
      width: 10px
      height: 10px
      list-style: none
      border-radius: 50%
      background-color: #fff
      opacity: .5
    .active
      opacity: 1
</style>

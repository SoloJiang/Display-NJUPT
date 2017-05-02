<template>
  <div class="player">
    <div class="imgs" ref="imgList">
      <img v-for="(item, index) in imgs" :key="index" src="../assets/temple.jpeg" class="img"  @touchstart="getClientX($event)" @touchmove="moveList($event)" @touchend="endMove()"/>
    </div>
    <ul class="img-btns" ref="ulList" @touchstart="changeIndex($event)" @click="changeIndex($event)">
      <li v-for="(item, index) in imgs" :key="index" class="img-btn" :class="{active: index === activeIndex}"></li>
    </ul>
  </div>
</template>

<script>
  /* eslint-disable no-trailing-spaces */

  export default {
    data () {
      return {
        imgs: ['../assets/temple.jpeg', '../assets/temple.jpeg', '../assets/temple.jpeg'],
        activeIndex: 0,
        timeout: null,
        clientX: null,
        clientWidth: null,
        changeX: null
      }
    },
    methods: {
      slider () {
        let imgList = this.$refs.imgList || document.querySelector('.imgs')[0]
        let translateX
        let len = this.imgs.length
        if (this.activeIndex + 1 === len) {
          translateX = 0
          this.activeIndex = 0
        } else {
          this.activeIndex++
          translateX = -this.activeIndex * this.clientWidth
        }
        imgList.style.transform = `translateX(${translateX}px)`
      },
      timeCount () {
        console.log('begin')
        this.timeout = setTimeout(() => {
          this.$refs.imgList.classList.add('img-transition')
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
            console.log('end')
            this.activeIndex = index
            this.$refs.imgList.classList.add('img-transition')
            let imgList = this.$refs.imgList || document.querySelector('.imgs')[0]
            let translateX = -this.activeIndex * this.clientWidth
            imgList.style.transform = `translateX(${translateX}px)`
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
        imgList.style.transform = `translateX(${translateX}px)`
      },
      endMove () {
        let imgList = this.$refs.imgList
        imgList.classList.add('img-transition')
        if (this.changeX > 0 && this.activeIndex !== this.imgs.length - 1) {
          this.activeIndex ++
        } else if (this.changeX < 0 && this.activeIndex !== 0) {
          this.activeIndex --
        }
        let translateX = -this.activeIndex * this.clientWidth
        imgList.style.transform = `translateX(${translateX}px)`
        this.timeCount()
      }
    },
    mounted () {
      this.clientWidth = this.$refs.imgList.clientWidth
      this.timeCount()
    }
  }
</script>

<style lang="sass" scoped>
  .player
    position: relative
    overflow: hidden
  .imgs
    height: 31vh
    max-width: 100%
    white-space: nowrap
  .img-transition
    transition: all .5s
  .img
    width: 100%
    height: 100%
  .img-btns
    position: absolute
    bottom: 10px
    display: table-cell
    text-align: center
    width: 100%
    -webkit-tap-highlight-color: transparent
  .img-btn
    list-style: none
    width: 10px
    height: 10px
    border-radius: 50%
    background-color: #fff
    opacity: .5
    display: inline-block
    margin-left: 8px
  .active
    opacity: 1
</style>

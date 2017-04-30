<template>
  <div class="player">
    <div class="imgs" ref="imgList" @touchstart="clear()" @touchend="playerStart()">
      <img v-for="(item, index) in imgs" :key="index" src="../assets/temple.jpeg" class="img" />
    </div>
    <ul class="img-btns">
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
        player: null,
        activeIndex: 0
      }
    },
    methods: {
      slider () {
        let imgList = this.$refs.imgList || document.querySelector('.imgs')[0]
        const transZRegex = /\.*translateX\((.*)%\)/i
        let translateX = transZRegex.exec(imgList.style.transform) || 0
        if (translateX) {
          translateX = parseInt(translateX[1], 10)
          this.activeIndex = -translateX / 100
          let len = this.imgs.length
          if (this.activeIndex + 1 === len) {
            imgList.style.transform = 'translateX(0)'
            this.activeIndex = 0
          } else {
            translateX -= 100
            imgList.style.transform = `translateX(${translateX}%)`
            this.activeIndex ++
          }
        } else {
          imgList.style.transform = 'translateX(-100%)'
          this.activeIndex ++
        }
      },
      playerStart () {
        this.player = setInterval(() => {
          this.slider()
        }, 3000)
      },
      clear () {
        clearInterval(this.player)
      },
      movePlayer () {
        console.log(2)
      }
    },
    mounted () {
      this.playerStart()
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
    transition: all 1s
  .img
    width: 100%
    height: 100%
  .img-btns
    position: absolute
    bottom: 10px
    display: table-cell
    text-align: center
    width: 100%
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

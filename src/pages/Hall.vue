<template>
  <div id="hall">
    <div class="hall-list">
      <div v-for="(item, index) in imgs" class="hall-item">
        <img :src="item">
        <div class="navbar">
          <div class="hall-select" @click="">第{{numberConvert[index]}}展厅</div>
          <div class="hall-essence" @click="">展品荟萃</div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'

  export default {
    name: 'hall',
    data () {
      return {
        imgs: [],
        numberConvert: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '常设展览'
      let img1 = require('assets/pageHall/hall-1.jpg')
      let img2 = require('assets/pageHall/hall-2.jpg')
      let img3 = require('assets/pageHall/hall-3.jpg')
      this.imgs = [img1, img2, img3, img1, img2, img3]
    }
  }
</script>

<style lang="sass" scoped>
  #hall
    .hall-list
      max-height: calc(100vh - 50px - 3vh)
      padding: 0 1vh
      .hall-item
        position: relative
        margin-top: 1vh
        height: calc((100vh - 50px - 3vh) / 3)
        img
          width: 100%
          height: 100%
        .navbar
          display: flex
          position: absolute
          justify-content: space-between
          align-items: flex-end
          bottom: 0
          left: 0
          z-index: 10
          width: 100%
          height: 40%
          color: #fff
          background: linear-gradient(0deg, rgba(7, 17, 27, 0.7), rgba(0, 0, 0, 0))
          .hall-select
            padding: 3vh 3vh 1vh 3vh
          .hall-essence
            padding: 3vh 3vh 1vh 3vh
</style>

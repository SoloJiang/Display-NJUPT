<template>
  <div id="essence">
    <div class="essence-wrapper">
      <div class="essence-list">
        <div v-for="img in imgList1" class="essence-item">
          <img :src="img">
          <div class="desc">馆藏珍品</div>
        </div>
      </div>
      <div class="essence-list">
        <div v-for="img in imgList2" class="essence-item">
          <img :src="img">
          <div class="desc">馆藏珍品</div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'

  export default {
    name: 'essence',
    data () {
      return {
        imgs: [],
        imgList1: [],
        imgList2: []
      }
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '馆藏精品'
      let img1 = require('assets/pageMuseum/exhibition-1.jpg')
      let img2 = require('assets/pageMuseum/exhibition-2.jpg')
      let img3 = require('assets/pageMuseum/exhibition-3.jpg')
      let img4 = require('assets/pageMuseum/exhibition-4.jpg')
      let img5 = require('assets/pageMuseum/exhibition-5.jpg')
      this.imgs = [img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5, img1, img2, img3, img4, img5]
      for (let i = 0; i < this.imgs.length; i++) {
        if (i % 2) {
          this.imgList1.push(this.imgs[i])
        } else {
          this.imgList2.push(this.imgs[i])
        }
      }
    },
    components: {
      'v-footer': footer
    }
  }
</script>

<style lang="sass" scoped>
  #essence
    margin: 1vh 1vh 0 0
    font-size: 0
    .essence-list
      float: left
      margin-left: 1vh
      width: calc(50% - 1vh)
      .essence-item
        margin-bottom: 1vh
        img
          width: 100%
        .desc
          font-size: 14px
          color: #fff
          text-align: center
          background: rgb(159, 159, 159)
</style>

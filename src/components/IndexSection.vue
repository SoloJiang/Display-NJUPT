<template>
  <div class="section">
    <div  v-for="(item, index) in imgs" :keys="index"  class="href-body">
      <img :src="item" class="href-img">
      <div class="href-tip">展馆概况</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgs: []
      }
    },
    created () {
      let img1 = require('../assets/1.png')
      let img2 = require('../assets/2.png')
      let img3 = require('../assets/3.png')
      let img4 = require('../assets/4.png')
      let img5 = require('../assets/5.png')
      let img6 = require('../assets/6.png')
      this.imgs = [img1, img2, img3, img4, img5, img6]
    }
  }
</script>

<style lang="sass" scoped>
  .section
    display: flex
    flex-direction: column
    flex-wrap: wrap
    height: 254px
    overflow-x: auto
    -webkit-overflow-scrolling: touch
    margin-top: 20px
    padding-bottom: 36px
  ::-webkit-scrollbar
    visibility: hidden
  .href-body
    margin-left: 8px
    display: inline-block
    position: relative
  .href-img
    width: 160px
    height: 110px
    margin-top: 4px
  .href-tip
    width: 160px
    position: absolute
    top: 90px
    color: #fff
    font-size: 12px
    height: 24px
    line-height: 24px
    text-align: center
    background-color: rgba(0, 0, 0, .6)
</style>

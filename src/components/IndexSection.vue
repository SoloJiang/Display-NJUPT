<template>
  <div class="section">
    <div  v-for="(item, index) in sections" :keys="index" class="href-body">
      <img :src="item" class="href-img">
      <div class="href-tip">展馆概况</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sections: [],
        router: null
      }
    },
    created () {
      let img1 = require('../assets/pageHome/1.png')
      let img2 = require('../assets/pageHome/2.png')
      let img3 = require('../assets/pageHome/3.png')
      let img4 = require('../assets/pageHome/4.png')
      let img5 = require('../assets/pageHome/5.png')
      let img6 = require('../assets/pageHome/6.png')
      this.sections = [img1, img2, img3, img4, img5, img6]
    }
  }
</script>

<style lang="sass" scoped>
  .section
    display: flex
    margin-top: 20px
    padding-bottom: 36px
    height: 254px
    flex-direction: column
    flex-wrap: wrap
    overflow-x: auto
    -webkit-overflow-scrolling: touch
  ::-webkit-scrollbar
    visibility: hidden
  .href-body
    position: relative
    display: inline-block
    margin-left: 8px
  .href-img
    margin-top: 4px
    width: 160px
    height: 110px
  .href-tip
    position: absolute
    top: 90px
    line-height: 24px
    width: 160px
    height: 24px
    font-size: 12px
    color: #fff
    text-align: center
    background-color: rgba(0, 0, 0, .6)
</style>

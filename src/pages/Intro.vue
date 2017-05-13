<template>
  <div id="intro" v-bind:style="{ backgroundImage: `url(${background})` }">
    <div class="title">中山陵</div>
    <div class="roller"></div>
    <div class="container">
      <div class="card">
        <i class="icon-quote"></i>
        <div class="content">
          中山陵位于江苏南京市区，是伟大的革命先行者孙中山先生的陵墓，灵柩于1929年6月1日奉安于此。
        </div>
        <i class="icon-dots-three-horizontal"></i>
      </div>
      <div class="card" v-for="card in cards"></div>
      <div class="space"></div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'intro',
    data () {
      return {
        background: null,
        cards: ['', '']
      }
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '展馆概况'
    },
    components: {
      'v-footer': footer
    },
// eslint-disable-next-line no-dupe-keys
    created () {
      this.background = require('../assets/pageMuseum/reel-background.png')
//      let exhibitionId = this.$route.query.exhibition_id
//      this.$http.post(`Exhibition/getIntro?exhibition_id=${exhibitionId}`)
//        .then(res => {
//          this.background = res.data.background
//        })
    }
  }
</script>

<style lang="sass" scoped>
  #intro
    height: 100vh
    background-size: cover
    max-width: 100%
    overflow: hidden
  .roller
    width: 100%
    position: absolute
    top: 35%
    border-bottom: 1px solid #98937C
  .roller:after
      content: ''
      background: #fff
      position: absolute
      left: 46px
      width: 6px
      height: 6px
      border-radius: 50%
      border: 1px solid #5A5A5A
      top: -3px
  .title
    padding: 6px 14px 6px 14px
    background: #FFFFFF
    color: #E13D21
    display: inline-block
    font-size: 14px
    border-radius: 14px
    top: 28%
    left: 30px
    position: absolute
    &:after
      content: ''
      position: absolute
      bottom: -16px
      left: 10px
      border-width: 10px
      border-style: solid
      border-color: #fff transparent transparent transparent
  .container
    position: absolute
    top: 40%
    display: flex
    margin-top: 20px
    height: 200px
    flex-direction: column
    flex-wrap: wrap
    overflow-x: auto
    -webkit-overflow-scrolling: touch
    width: 100%
  .card
    position: relative
    height: 180px
    width: 280px
    background: #fff
    border-radius: 10px
    box-shadow: 0 0 2px #C3C3C3
    font-size: 14px
    margin-left: 20px
    top: 0
  .icon-quote
    font-size: 34px
    margin-left: 10px
    margin-top: 14px
    display: inline-block
    color: rgb(205, 205, 205)
  .icon-dots-three-horizontal
    position: absolute
    bottom: 10px
    right: 30px
    font-size: 26px
    color: rgb(205, 205, 205)
  .content
    position: absolute
    left: 40px
    top: 40px
    width: 210px
    line-height: 170%
  .space
    width: 10px
    height: 180px
    margin-left: 20px
</style>

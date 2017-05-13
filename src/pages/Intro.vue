<template>
  <div id="intro" v-bind:style="{ backgroundImage: `url(${background})` }">
    <div class="title">{{title}}</div>
    <div class="roller"></div>
    <div class="container">
      <div class="card">
        <i class="icon-quote"></i>
        <div class="content">
          {{intro}}
        </div>
        <i class="icon-dots-three-horizontal"></i>
      </div>
      <div class="card card-list" v-for="card in cards" :key="card.id">
        <div class="box">
          <div class="smallTtile">{{card.title}}</div>
          <div class="smallContent">{{card.content}}</div>
        </div>
        <img :src="baseUrl+card.thumb" class="card-img"/>
      </div>
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
        content: null,
        cards: [],
        title: null,
        intro: null,
        baseUrl: this._Global.url
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
      let exhibitionId = this.$route.query.exhibition_id
      Promise.all([this.$http.post(`Exhibition/getIntro?exhibition_id=${exhibitionId}`),
        this.$http.get(`Exhibition/getMediaViewLists?exhibition_id=${exhibitionId}`)])
        .then(resArr => {
          this.background = this._Global.url + resArr[0].data.background
          if (this.background === '') {
            this.background = require('../assets/pageMuseum/reel-background.png')
          }
          this.intro = resArr[0].data.intro
          this.title = resArr[0].data.title
          this.cards = resArr[1].data
        })
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
    border-radius: 4px
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
  .card-list
    width: 520px
    padding: 4px
  .card-img
    position: relative
    right: -44px
    width: 230px
    height: 100%
  .box
    position: relative
    display: inline-block
    width: 230px
    height: 168px
    left: 30px
    overflow: hidden
    text-overflow: ellipsis
    top: 12px
  .smallTitle
    color: red
    font-weight: bold
    width: 220px
    border-bottom: 1px solid #A7C7C1
    padding-bottom: 4px
  .smallContent
    width: 220px
    line-height: 170%
</style>

<template>
  <div id="intro" v-bind:style="{ backgroundImage: `url(${background})` }">
    <div class="title">{{title}}</div>
    <div class="voice" @click="play" v-show="voiceShow">
      <span class="voice-text">{{voice}}</span>
      <audio ref="player" :src="src" @ended="end"></audio>
    </div>
    <div class="roller"></div>
    <div class="container" ref="content" @scroll="getOffsetX($event)">
      <div class="card">
        <i class="icon-quote"></i>
        <div class="content">
          {{intro}}
        </div>
        <i class="icon-dots-three-horizontal"></i>
      </div>
      <div class="card card-list" v-for="(card, index) in cards" :key="card.id" @click="showContent(index)">
        <div class="box">
          <div class="smallTitle">{{card.title}}</div>
          <div class="smallIntro">{{intro}}</div>
        </div>
        <img class="smallImg" :src="baseUrl+card.thumb"/>
      </div>
      <div class="space"></div>
    </div>
    <v-footer></v-footer>
    <div id="mask" v-show="flag" @click="flag = !flag" v-html="detail"></div>
  </div>
</template>

<script>
  /* eslint-disable no-useless-escape */

  import footer from 'components/Footer'
  const encodeHtml = require('../utils/encodeHtml').encodeHtml
  export default {
    name: 'intro',
    data () {
      return {
        background: null,
        content: null,
        cards: [],
        title: null,
        intro: null,
        baseUrl: this._Global.url,
        clientWidth: null,
        temple: null,
        start: false,
        src: null,
        voice: '语音',
        flag: false,
        detail: null
      }
    },
    computed: {
      voiceShow () {
        return this.src !== null
      }
    },
    components: {
      'v-footer': footer
    },
// eslint-disable-next-line no-dupe-keys
    created () {
      this.clientWidth = document.body.clientWidth
      let exhibitionId = this.$route.query.exhibition_id
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
      Promise.all([this.$http.post(`Exhibition/getIntro?exhibition_id=${exhibitionId}`),
        this.$http.get(`Exhibition/getMediaViewLists?exhibition_id=${exhibitionId}`)])
        .then(resArr => {
          this.background = this._Global.url + resArr[0].data.background
          if (this.background === '') {
            this.background = require('../assets/pageMuseum/reel-background.png')
          }
          this.intro = resArr[0].data.intro
          this.title = resArr[0].data.title
          this.temple = resArr[0].data.title
          resArr[1].data.forEach(item => {
            item.content = encodeHtml(item.content)
          })
          this.cards = resArr[1].data
        })
    },
    methods: {
      getOffsetX (e) {
        let translateX = e.target.scrollLeft
        if (translateX < this.clientWidth) {
          this.title = this.temple
          this.src = null
        } else {
          let num = parseInt((translateX - 300) / 520)
          if (this.src !== this.cards[num].voice) {
            this.title = this.cards[num].title
            this.src = this.cards[num].voice
            this.voice = '语音'
          }
        }
      },
      play () {
        let player = this.$refs.player
        if (!this.start) {
          player.play()
          this.voice = '播放中'
        } else {
          player.pause()
          this.voice = '语音'
        }
        this.start = !this.start
      },
      end () {
        this.voice = '语音'
      },
      showContent (index) {
        this.flag = !this.flag
        this.detail = this.cards[index].content
      }
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
  .voice
    top: 28%
    right: 30px
    position: absolute
    background: #fff
    font-size: 14px
    color: #565556
    padding: 6px 14px 6px 26px
    border-radius: 14px
  .voice-text:before
    position: absolute
    content: ''
    border-width: 5px
    border-style: solid
    border-color: transparent transparent transparent #565556
    left: 16px
    top: 9px
  .container
    position: absolute
    top: 40%
    display: flex
    margin-top: 20px
    height: 200px
    flex-direction: column
    flex-wrap: wrap
    overflow-x: auto
    overflow-y: hidden
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
    width: 500px
  .box
    position: relative
    display: inline
    height: 160px
    left: 30px
    font-size: 14px
    overflow: hidden
    text-overflow: ellipsis
    top: 30px
  .smallTitle
    color: red
    font-weight: bold
    width: 200px
    border-bottom: 1px solid #A7C7C1
    padding-bottom: 6px
  .smallIntro
    width: 180px
    display: inline-block
    position: relative
    top: -114px
  .smallImg
    height: 172px
    width: 240px
    position: relative
    right: -72px
    top: -22px
  #mask
    position: absolute
    top: 0
    height: 100vh
    max-height: 100vh
    max-width: 100%
    width: 80%
    background: #fff
    padding: 10%
</style>

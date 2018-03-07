<template>
  <div id="museum-guide">
    <div class="reel">
      <div class="content">
        <div class="desc-wrapper" ref="descWrapper">
          <div class="desc top">{{descTop}}</div>
          <img :src="src" class="img" v-show="src !== ''"/>
          <div class="desc bottom">{{descBottom}}</div>

          <div v-if="title" class="title">{{title}}</div>
          <div v-if="desc" class="desc" v-html="content">
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  const encodeHtml = require('../utils/encodeHtml').encodeHtml
  export default {
    name: 'museum-guide',
    data () {
      return {
        content: '',
        title: '',
        src: '',
        descTop: '',
        descBottom: ''
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      let hallId = this.$route.query.hall_id
      let exhibitId = this.$route.query.exhibit_id
      if (exhibitId === undefined || exhibitId === null) {
        if (hallId === undefined || hallId === null) {
          let exhibitionId = this.$route.query.exhibition_id
          this.$http.get(`Exhibition/getQRCode?exhibition_id=${exhibitionId}`)
            .then(res => {
              this.src = this._Global.url + res.data.QRCode
              this.descTop = res.data.desc_top
              this.descBottom = res.data.desc_bottom
            })
        } else {
          this.$http.get(`Exhibition/hallDetail?hall_id=${hallId}`)
            .then(res => {
              this.content = encodeHtml(res.data.content)
            })
        }
      } else {
        this.$http.get(`Exhibition/exhibitDetail?exhibit_id=${exhibitId}`)
          .then(res => {
            this.content = encodeHtml(res.data.content)
          })
      }
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    }
  }</script>

<style lang="sass" scoped>
  #museum-guide
    width: 100%
    min-height: 100vh
    .reel
      padding: 0 10vh
      height: 92vh
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
      .content
        display: flex
        padding: 10vh 0
        height: calc(100% - 20vh)
        align-items: center
        .desc-wrapper
          display: flex
          margin: 0 auto
          width: 60vw
          height: 60vw
          text-align: center
          overflow: scroll
          flex-direction: column
          justify-content: space-around
          background: linear-gradient(180deg, rgba(115, 101, 63,.8), rgba(115, 101, 63,.8) 50%, rgba(255, 255, 255, .8) 50%, rgba(255, 255, 255, .8))
          .desc
            line-height: 1.5
            font-size: 16px
            &.top
              padding-top: 20px
              color: #fff
            &.bottom
              padding-bottom: 20px
  .title
    margin-bottom: 30px
    font-weight: bold
  .img
    display: block
    margin: 0 auto
    width: 40%
    height: auto
  img
    max-width: 100%
    height: auto
</style>

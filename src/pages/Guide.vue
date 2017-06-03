<template>
  <div id="museum-guide">
    <div class="reel">
      <div class="content">
        <div class="desc-wrapper" ref="descWrapper">
          <img :src="src" class="img" v-show="src !== ''"/>
          <div class="title">{{title}}</div>
          <div class="desc" v-html="content">
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
        src: ''
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      let id = this.$route.params.id
      let hallId = this.$route.query.hall_id
      let exhibitId = this.$route.query.exhibit_id
      if (exhibitId === undefined || exhibitId === null) {
        if (hallId === undefined || hallId === null) {
          if (id === undefined || id === null) {
            let exhibitionId = this.$route.query.exhibition_id
            let token = window.sessionStorage.getItem('token')
            if (this.$route.path === '/QRCode') {
              this.$http.get(`Exhibition/getQRCode?token=${token}&exhibition_id=${exhibitionId}`)
                .then(res => {
                  this.src = this._Global.url + res.data.QRCode
                })
            } else {
              this.$http.get(`Exhibition/getGuide?exhibition_id=${exhibitionId}`)
                .then(res => {
                  this.content = encodeHtml(res.data.guideContent)
                })
            }
          } else {
            this.$http.get(`News/detail?news_id=${id}`)
              .then(res => {
                this.title = res.data.title
                this.content = encodeHtml(res.data.content)
              })
          }
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
  }
</script>

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
        padding-top: 10vh
        .desc-wrapper
          max-height: 70vh
          overflow: scroll
          .desc
            font-size: 14px
            text-indent: 2em
  .title
    margin-bottom: 30px
    font-weight: bold
  .img
    width: 80%
    height: auto
    margin-left: 10%
  img
    max-width: 100%
    height: auto
</style>

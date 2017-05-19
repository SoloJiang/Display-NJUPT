<template>
  <div id="museum-guide">
    <div class="reel">
      <div class="content">
        <div class="desc-wrapper" ref="descWrapper">
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
        title: ''
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
            document.getElementsByTagName('title')[0].innerHTML = '参观指南'
            let exhibitionId = this.$route.query.exhibition_id
            this.$http.get(`Exhibition/getGuide?exhibition_id=${exhibitionId}`)
              .then(res => {
                this.content = encodeHtml(res.data.guideContent)
              })
          } else {
            document.getElementsByTagName('title')[0].innerHTML = '动态详情'
            this.$http.get(`News/detail?news_id=${id}`)
              .then(res => {
                this.title = res.data.title
                this.content = encodeHtml(res.data.content)
              })
          }
        } else {
          document.getElementsByTagName('title')[0].innerHTML = '展厅详情'
          this.$http.get(`Exhibition/hallDetail?hall_id=${hallId}`)
            .then(res => {
              this.content = encodeHtml(res.data.content)
            })
        }
      } else {
        document.getElementsByTagName('title')[0].innerHTML = '展品详情'
        this.$http.get(`Exhibition/exhibitDetail?exhibit_id=${exhibitId}`)
          .then(res => {
            this.content = encodeHtml(res.data.content)
          })
      }
    }
  }
</script>

<style lang="sass" scoped>
  #museum-guide
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 60% no-repeat fixed
    background-size: 300% 120%
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
</style>

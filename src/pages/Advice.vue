<template>
  <div id="museum-advice">
    <div class="reel">
      <div class="title">{{title}}</div>
      <div class="desc">您有什么意见或建议请告诉我们</div>
      <form action="#">
        <textarea name="advice" class="advice-input" placeholder="您的宝贵意见，就是我们前进的动力" v-model="content"></textarea>
        <div class="advice-submit" @touchstart="submit">{{result}}</div>
      </form>
      <div class="tel">
        <i class="icon-phone"></i>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  import util from '../utils/encodeHtml'
  export default {
    name: 'museum-advice',
    data () {
      return {
        content: '',
        title: '',
        flag: true,
        result: '提交'
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.hideMenu()
      if (intro) {
        this.title = intro.title
      }
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    },
    methods: {
      submit () {
        if (this.content.length !== 0) {
          let that = this
          this.content = util.xssFilter(this.content)
          if (this.flag) {
            this.flag = false
            let exhibitonId = this.$route.query.exhibition_id
            let token = window.sessionStorage.getItem('token')
            this.result = '正在提交...'
            this.$http.post(`User/feedback?token=${token}&exhibition_id=${exhibitonId}`, {
              content: that.content
            }).then(() => {
              window.alert('提交成功')
              this.result = '提交'
              this.flag = true
              this.content = ''
            })
          }
        } else {
          window.alert('信息不能留空')
        }
      }
    }
  }</script>

<style lang="sass" scoped>
  #museum-advice
    width: 100%
    min-height: 100vh
    background-size: 300% 120%
    .reel
      padding: 0 10vh
      height: 92vh
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
      color: rgb(137, 53, 62)
      .title
        padding-top: 10vh
        font-size: 16px
        text-align: center
      .desc
        font-size: 14px
        margin-top: 50px
      .advice-input
        margin-top: 20px
        padding: 10px
        width: calc(100% - 20px)
        height: 200px
        background: rgba(0, 0, 0, 0)
        border: 1px solid rgba(0, 0, 0, 0.6)
        resize: none
        font-size: 14px
      .advice-submit
        margin-top: 14px
        line-height: 34px
        height: 34px
        font-size: 14px
        color: #fff
        text-align: center
        letter-spacing: 6px
        background: rgb(130, 86, 65)
        border-radius: 3px
      .tel
        margin-top: 20px
        color: rgb(108, 108, 108)
        text-align: center
        .icon-phone::before
          display: inline-block
          padding: 2px
          transform: rotate(76deg)
          border: 1px solid rgb(108, 108, 108)
          border-radius: 50%
</style>

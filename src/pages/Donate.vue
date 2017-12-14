<template>
  <div id="museum-advice">
    <div class="reel">
      <h2 class="title">{{tit}}</h2>
      <form action="#" class="form-donate">
        <label for="name">
          捐赠人姓名<input type="text" class="input-name" v-model="name">
        </label>
        <label for="contact">
          联系方式<input type="tel" class="input-contact" v-model="tel">
        </label>
        <label for="thing">
          捐赠物品名称<input type="text" class="input-thing" v-model="title">
        </label>
        <label for="desc">
          说明<textarea name="desc" class="input-desc" placeholder="请说明捐赠物品，并留下联系方式， 我们会及时跟您联系！" v-model="content"></textarea>
        </label>
        <div class="tel">
          <i class="icon-phone"></i>
          {{phone}}
        </div>
        <div class="advice-submit" @touchstart="submit">提交</div>
      </form>
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
        phone: '',
        tit: '',
        name: '',
        title: '',
        tel: '',
        content: '',
        flag: true
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.hideMenu()
      if (intro) {
        this.tit = intro.title
      }
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    },
    methods: {
      submit () {
        if (this.name.length !== 0 && this.tel.length !== 0 && this.title.length !== 0 && this.content.length !== 0) {
          let that = this
          this.name = util.xssFilter(this.name)
          this.tel = util.xssFilter(this.tel)
          this.title = util.xssFilter(this.title)
          this.content = util.xssFilter(this.content)
          if (this.flag) {
            this.flag = false
            let exhibitonId = this.$route.query.exhibition_id
            let token = window.sessionStorage.getItem('token')
            this.$http.post(`User/donate?token=${token}&exhibition_id=${exhibitonId}`, {
              name: that.name,
              title: that.title,
              tel: that.tel,
              content: that.content
            }).then(() => {
              window.alert('提交成功')
              this.name = ''
              this.tel = ''
              this.title = ''
              this.content = ''
            })
          }
        } else {
          window.alert('信息不能留空')
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  #museum-advice
    width: 100%
    min-height: 100vh
    .reel
      padding: 0 10vh
      height: 105vh
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
      color: rgb(130, 86, 65)
      .title
        padding-top: 10vh
        font-size: 28px
        text-align: center
      .form-donate
        margin-top: 16px
        text-align: center
        [class ^= 'input']
          height: 24px
          text-align: center
          border: 1px solid rgba(7, 17, 27, 0.6)
          background: rgba(0, 0, 0, 0)
        .input-desc
          padding: 10px
          width: calc(100% - 20px)
          height: 86px
          text-align: left
          resize: none
          &::placeholder
            color: #999999
        & label, & input, & textarea
          display: inline-block
          margin-top: 5px
          width: 100%
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

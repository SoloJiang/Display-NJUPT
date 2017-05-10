<template>
  <div id="museum-advice">
    <div class="reel">
      <h2 class="title">四季南邮</h2>
      <form action="#" class="form-donate">
        <label for="name">
          捐赠人姓名<input type="text" class="input-name">
        </label>
        <label for="contact">
          联系方式<input type="tel" class="input-contact">
        </label>
        <label for="thing">
          捐赠物品名称<input type="text" class="input-thing">
        </label>
        <label for="desc">
          说明<textarea name="desc" class="input-desc" placeholder="请说明捐赠物品，并留下联系方式， 我们会及时跟您联系！"></textarea>
        </label>
        <div class="tel">
          <i class="icon-phone"></i>
          4000211314
        </div>
        <div class="advice-submit">提交</div>
      </form>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'museum-advice',
    components: {
      'v-footer': footer
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '捐赠'
    }
  }
</script>

<style lang="sass" scoped>
  #museum-advice
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 60% no-repeat fixed
    background-size: 300% 120%
    .reel
      padding: 0 10vh
      height: 92vh
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

<template>
  <div id="museum-advice">
    <div class="reel">
      <div class="title">四季南邮</div>
      <div class="desc">您有什么意见或建议请告诉我们</div>
      <form action="#">
        <textarea name="advice" class="advice-input" placeholder="您的宝贵意见，就是我们前进的动力"></textarea>
        <div class="advice-submit">提交</div>
      </form>
      <div class="tel">
        <i class="icon-phone"></i>
        4000211314
      </div>
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
      document.getElementsByTagName('title')[0].innerHTML = '意见建议'
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

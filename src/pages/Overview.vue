<template>
  <div id="overview">
    <div class="flex-container">
      <div class="nav-wrapper">
        <div class="desc">
          中山陵
          <div class="angle"></div>
        </div>
        <div class="nav-line">
          <div class="line-left"></div>
          <div class="dot"></div>
          <div class="line-right"></div>
        </div>
      </div>
      <div class="desc-wrapper">
        <div class="card-1">
          <i class="icon-quote"></i>
          中山陵位于江苏南京市区，是伟大的革命先行者孙中山先生的陵墓，灵柩于1929年6月1日奉安于此。
          <i class="icon-dots-three-horizontal"></i>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
//  没文本数据，滑动功能偷懒没做orz...

  export default {
    name: 'overview',
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '展馆概况'
    },
    components: {
      'v-footer': footer
    }
  }
</script>

<style lang="sass" scoped>

  #overview
    display: flex
    width: 100%
    min-height: 100vh
    flex-wrap: wrap
    align-items: center
    background: url("../assets/pageMuseum/reel-background.png") 60% no-repeat fixed
    background-size: 300% 120%
    .nav-wrapper
      margin-top: -20vh
      width: 100%
      .desc
        position: relative
        left: 4vh
        width: 80px
        height: 30px
        line-height: 30px
        color: rgb(196, 54, 23)
        text-align: center
        border-radius: 20px
        background: #fff
        .angle
          position: absolute
          top: 29px
          left: 14px
          width: 0
          height: 0
          border-left: 6px solid transparent
          border-right: 6px solid transparent
          border-top: 6px solid #fff
      .nav-line
        display: flex
        margin-top: 1.5vh
        /* 宽度有问题 */
        width: 100vw
        align-items: center
        .line-left
          display: inline-block
          width: 6.4vh
          border-top: 1px solid rgba(150, 150, 150, 0.8)
        .dot
          display: inline-block
          width: 7px
          height: 7px
          border: 2px solid rgb(94, 92, 80)
          border-radius: 50%
          background: #fff
        .line-right
          display: inline-block
          flex: 1
          border-top: 1px solid rgba(150, 150, 150, 0.8)
    .desc-wrapper
      margin: 4vh 0 0 3.5vh
      width: 100%
      height: 100px
      .card-1
        display: inline-block
        position: relative
        padding: 50px 34px
        width: 250px
        line-height: 36px
        border-radius: 5px
        background: #fff
        .icon-quote
          position: absolute
          top: 26px
          left: 8px
          font-size: 36px
          color: rgb(205, 205, 205)
        .icon-dots-three-horizontal
          position: absolute
          bottom: 10px
          right: 36px
          font-size: 26px
          color: rgb(205, 205, 205)
</style>

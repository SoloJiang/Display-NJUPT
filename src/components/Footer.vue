<template>
  <div class="footer">
    <div class="back-btn" @click="back">
      <i class="icon-angle-left" :style="{color: iconColor}"></i>
    </div>
    <span class="rights" :style="{color: fontColor}">2017 &copy; 展览馆万事通</span>
    <div class="home-btn" @click="home">
      <i class="icon-home" :style="{color: iconColor}"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    props: {
      fontColor: {
        type: String
      },
      iconColor: {
        type: String
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      home () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="sass" scoped>
  .footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    text-align: center
    background: rgba(255, 255, 255, 0.8)
    .back-btn
      position: absolute
      top: 0
      left: 16px
      padding: 10px 20px
      .icon-angle-left
        font-size: 26px
        color: rgb(128, 128, 128)
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7)
    .rights
      line-height: 50px
      font-size: 14px
      color: #808080
    .home-btn
      position: absolute
      top: 0
      right: 20px
      padding: 10px
      .icon-home
        font-size: 26px
        color: rgb(128, 128, 128)
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7)
</style>

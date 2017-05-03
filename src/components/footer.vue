<template>
  <div class="footer">
    <span>2017&copy;展览馆万事通</span>
    <div class="home-btn">
      <img src="../assets/icon-home.png" width="30" height="28">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer'
  }
</script>

<style lang="sass" scoped>
  .footer
    position: fixed
    bottom: 0
    left: 0
    line-height: 50px
    width: 100%
    height: 50px
    font-size: 14px
    text-align: center
    color: rgb(178, 178, 178)
    background: rgba(255, 255, 255, 0.4)
    .home-btn
      position: absolute
      right: 20px
      top: 0
      padding: 10px
      height: 30px
</style>

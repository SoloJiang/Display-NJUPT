<template>
  <div id="museum-advice">
    <div class="reel"></div>
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
      document.getElementsByTagName('title')[0].innerHTML = '个人中心'
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/fonts/icon"
  #museum-advice
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 50% no-repeat
    background-size: 200% 100%
    .reel
      height: 92vh
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
</style>

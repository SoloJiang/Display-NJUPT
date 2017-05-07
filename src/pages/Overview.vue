<template>
  <div id="overview">
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'

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
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 60% no-repeat fixed
    background-size: 300% 120%
</style>

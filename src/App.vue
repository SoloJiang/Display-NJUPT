<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {}
  }
</script>

<style lang="sass">
  @import "./assets/fonts/icon"

  *
    margin: 0
    padding: 0

  #app
    font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>

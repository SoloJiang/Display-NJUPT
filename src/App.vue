<template>
  <div id="app"  v-bind:style="{ backgroundImage: `url(${background})`}">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        background: '',
        baseUrl: this._Global.url
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.background = vm.baseUrl + JSON.parse(window.sessionStorage.getItem('intro')).background
      })
    }
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
    min-height: 100vh
    background: #FDFEDB
    background-size: cover
</style>

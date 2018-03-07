<template>
  <div id="app"  v-bind:style="{ backgroundImage: `url(${background})`}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      background: "",
      baseUrl: this._Global.url
    };
  },
  created() {
    this.back();
  },
  methods: {
    back() {
      let intro = window.sessionStorage.getItem("intro");
      if (!intro) {
        setTimeout(() => {
          this.back();
        }, 100);
      } else {
        this.background = this.baseUrl + JSON.parse(intro).background;
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    this.back();
  }
};</script>

<style lang="sass">
  @import "./assets/fonts/icon"

  *
    margin: 0
    padding: 0

  #app
    font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    height: 100vh
    background: #FDFEDB
    background-size: cover
    overflow: scroll
</style>

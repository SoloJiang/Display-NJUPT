<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer">2017&copy;展览馆万事通</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: #FDFEDB;
}
.footer {
  font-size: 12px;
  color: #B3B3B2;
  text-align: center;
  margin-top: 40px;
}
</style>

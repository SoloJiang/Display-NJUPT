<template>
  <div id="city-select">
    <div class="searchbar">
      <i class="icon-search"></i>
      <input type="text" class="input-search" placeholder="输入城市名或拼音查询">
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'citySelect',
    components: {
      'v-footer': footer
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '选择展览馆'
    }
  }
</script>

<style lang="sass" scoped>
  #city-select
    margin-right: 22px
    .searchbar
      position: relative
      margin-left: 10px
      .icon-search
        position: absolute
        top: 14px
        left: 80px
        font-size: 20px
      .input-search
        margin: 10px 0
        width: 100%
        height: 30px
        font-size: 12px
        text-align: center
        border: 1px solid rgba(7, 17, 27, 0.5)
        border-radius: 3px
        background: rgb(244, 244, 244)
</style>

<template>
  <div class="search">
    <select class="option">
      <option v-for="(item, index) in cities" :keys="index">{{item}}</option>
    </select>
    <div class="search-body">
      <label>
        <img src="../assets/search.png" class="search-img"/>
        <input type="text" class="search-input" placeholder="展品搜索">
      </label>
      <div class="search-cansel">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cities: ['南京', '上海', '武汉']
      }
    }
  }
</script>

<style lang="sass" scoped>
  .search
    padding: 16px
    max-width: 100%
  .option
    font-size: 14px
    display: inline-block
    background-color: transparent
    border: none
    margin-left: 10px
    line-height: 44px
    height: 44px
    width: 46px
    -webkit-tap-highlight-color: transparent
  .search-body
    position: relative
    float: right
    width: 72%
    height: 32px
    background-color: #fff
    border: 1px solid #000
    display: inline-block
    padding: 6px 10px
  .search-img
    height: 32px
    width: auto
  .search-input
    position: absolute
    top: 8px
    left: 60px
    height: 26px
    width: 50%
    font-size: 16px
    border: none
    outline: none
    -webkit-tap-highlight-color: #fff
  .search-cansel
    display: inline-block
    float: right
    color: #8A8A8A
    border-left: 1px solid #CACACA
    padding: 4px 0 4px 10px
</style>

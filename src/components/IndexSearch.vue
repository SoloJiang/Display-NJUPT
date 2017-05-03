<template>
  <div class="search">
    <select class="option">
      <option v-for="(item, index) in cities" :keys="index">{{item}}</option>
    </select>
    <div class="search-body">
      <label>
        <img src="../assets/search.png" class="search-img"/>
        <input type="text" class="search-input" placeholder="展品搜索" v-model="searchInput">
      </label>
      <div class="cancel-box" @click="cancelInput">
        <div class="search-cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cities: ['南京', '上海', '武汉'],
        searchInput: ''
      }
    },
    methods: {
      cancelInput () {
        this.searchInput = ''
      }
    }
  }
</script>

<style lang="sass" scoped>
  .search
    padding: 16px
    max-width: 100%
    border-bottom: 1px solid rgba(7, 17, 27, 0.05)
    .option
      display: inline-block
      margin-left: 10px
      width: 46px
      height: 44px
      font-size: 14px
      appearance: none
      background: url("../assets/arrow.png") no-repeat scroll right center transparent
      background-size: 25% 20%
      border: none
      -webkit-tap-highlight-color: transparent
      &:active, &:focus
        outline: none
    .search-body
      position: relative
      float: right
      width: 72%
      height: 32px
      background-color: #fff
      border: 1px solid rgba(7, 17, 27, 0.6)
      display: inline-block
      padding: 6px 10px
      padding-right: 0
    .search-img
      margin: 4px 0 0 10px
      height: 24px
      width: auto
    .search-input
      position: relative
      top: -6px
      left: 10px
      height: 36px
      width: 50%
      font-size: 14px
      border: none
      outline: none
      -webkit-tap-highlight-color: #fff
      &::placeholder
        color: rgba(7, 17, 27, 0.4)
    .cancel-box
      display: inline-block
      float: right
      margin-top: -6px
      padding: 10px
      .search-cancel
        line-height: 26px
        font-size: 14px
        color: #8A8A8A
        border-left: 1px solid #CACACA
        padding-left: 10px
</style>

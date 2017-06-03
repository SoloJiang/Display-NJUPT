<template>
  <div class="search">
    <div class="search-body">
      <label>
        <i class="icon-search"></i>
        <input type="text" class="search-input" placeholder="展品搜索" v-model="searchInput">
      </label>
      <div class="cancel-box">
        <div class="search-cancel" @click="search">搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable spaced-comment */

  export default {
    data () {
      return {
        searchInput: ''
      }
    },
    methods: {
      search () {
        //发送搜索请求
        if (this.searchInput !== '') {
          this.$router.push(`/exhibit_search?exhibition_id=${window.sessionStorage.getItem('exhibiton_id')}&key=${this.searchInput}`)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>

  .search
    padding: 16px
    max-width: 100%
    border-bottom: 1px solid rgba(7, 17, 27, 0.05)
    .search-body
      position: relative
      width: 90%
      left: 5%
      box-sizing: border-box
      height: 40px
      background-color: #fff
      border: 1px solid rgba(7, 17, 27, 0.6)
      display: inline-block
      padding: 6px 0 6px 10px
    .icon-search
      display: inline-block
      height: 24px
      font-size: 24px
      &::before
        display: inline-block
        transform: rotate(20deg)
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
      margin-top: -10px
      padding: 10px
      .search-cancel
        line-height: 26px
        font-size: 14px
        color: #8A8A8A
        border-left: 1px solid #CACACA
        padding-left: 10px
</style>

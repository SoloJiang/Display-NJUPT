<template>
  <div class="section">
    <div  v-for="(item, index) in imgs" :keys="index"  class="href-body">
      <img src="../assets/temple.jpeg" class="href-img">
      <div class="href-tip">展馆概况</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgs: ['', '', '', '', '', '', '', '', '']
      }
    }
  }
</script>

<style lang="sass" scoped>
  .section
    display: flex
    flex-direction: column
    flex-wrap: wrap
    height: 250px
    overflow-x: auto
    -webkit-overflow-scrolling: touch
    margin-top: 20px
  ::-webkit-scrollbar
    visibility: hidden
  .href-body
    margin-left: 12px
    display: inline-block
    position: relative
  .href-img
    width: 150px
    height: 100px
    margin-top: 10px
  .href-tip
    width: 150px
    position: absolute
    top: 86px
    color: #fff
    font-size: 12px
    height: 24px
    line-height: 24px
    text-align: center
    background-color: rgba(0, 0, 0, .4)

</style>

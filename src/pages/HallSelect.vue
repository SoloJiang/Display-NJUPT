<template>
  <div id="hall-select">
    <div class="reel">
      <h2 class="title">四季南邮</h2>
      <form action="#" class="form-donate">
        <label>选择默认展览馆</label>
        <div class="flex-container">
          <select name="city" class="select-city">
            <option value="南京">南京</option>
          </select>
          <select name="hall" class="select-hall">
            <option value="四季南邮">四季南邮</option>
          </select>
        </div>
        <div class="advice-submit">提交</div>
      </form>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'hallSelect',
    components: {
      'v-footer': footer
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '选择展览馆'
    }
  }
</script>

<style lang="sass" scoped>
  #hall-select
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 60% no-repeat fixed
    background-size: 300% 120%
    .reel
      padding: 0 10vh
      height: 92vh
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
      color: rgb(130, 86, 65)
      .title
        padding-top: 10vh
        font-size: 28px
        text-align: center
      .form-donate
        margin-top: 22px
        text-align: center
        label
          display: inline-block
          margin-bottom: 6px
          width: 100%
        .flex-container
          display: flex
          align-items: center
          .select-city
            width: 50px
            height: 50px
            font-size: 16px
            color: rgb(130, 86, 65)
            appearance: none
            border: 0
            background: url("../assets/pageSelect/angle1.png") no-repeat scroll 90% 58% transparent
            background-size: 16% 14%
          .select-hall
            margin-left: 5px
            padding-left: 55px
            height: 34px
            flex: 1
            font-size: 14px
            color: rgb(7, 17, 27)
            appearance: none
            border: 1px solid rgba(7, 17, 27, 0.5)
            border-radius: 5px
            background: url("../assets/pageSelect/angle2.png") no-repeat scroll 90% center transparent
            background-size: 6% 22%
      .advice-submit
        margin-top: 76px
        line-height: 34px
        height: 34px
        font-size: 16px
        color: #fff
        text-align: center
        letter-spacing: 10px
        background: rgb(130, 86, 65)
        border-radius: 3px
</style>

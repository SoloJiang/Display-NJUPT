<template>
  <transition name="fade">
    <div id="hall-select">
      <div class="reel">
        <h2 class="title">{{title}}</h2>
        <form action="#" class="form-donate">
          <label>选择默认展览馆</label>
          <div class="flex-container">
            <div @click="selectCity" class="select-city">{{city}}</div>
            <transition name="fold">
              <div class="select-hall" :class="{'active': hallSelect}">
                <div class="current-hall" @click="showSelect">
                  四季南邮
                  <img class="angle" src="../assets/pageSelect/angle2.png">
                </div>
                <div class="hall"><input type="text" v-model="hallInput" class="input"></div>
                <div v-for="item in hallList" :key="item" class="hall">{{item.name}}</div>
              </div>
            </transition>
          </div>
          <div class="advice-submit">提交</div>
        </form>
      </div>
      <v-footer></v-footer>
    </div>
  </transition>
</template>

<script>
  import footer from 'components/Footer'
  let getCity = require('../utils/getCity').getCity
  export default {
    name: 'hallSelect',
    data () {
      return {
        city: '南京',
        currentHall: '四季南邮',
        halls: [
          {name: '四季南邮'},
          {name: '华为研究所'}
        ],
        hallInput: '',
        hallSelect: false,
        title: ''
      }
    },
    computed: {
      hallList () {
        let vm = this
        return this.halls.filter((el) => {
          return el.name.indexOf(vm.hallInput) !== -1
        })
      }
    },
    methods: {
      selectCity () {
        this.$router.push('/cityselect')
      },
      showSelect () {
        this.hallSelect = !this.hallSelect
      }
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '选择展览馆'
//      console.log(this.halls)
      let intro = window.sessionStorage.getItem('intro')
      this.title = JSON.parse(intro).title
      getCity()
    },
    mounted () {
      if (window.sessionStorage.getItem('city')) {
        this.city = window.sessionStorage.getItem('city')
      }
    },
    components: {
      'v-footer': footer
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
        position: relative
        margin-top: 22px
        text-align: center
        label
          display: inline-block
          margin-bottom: 6px
          width: 100%
        .flex-container
          display: flex
          align-items: flex-start
          .select-city
            padding-right: 20px
            max-width: 50px
            height: 50px
            line-height: 50px
            overflow: hidden
            font-size: 16px
            color: rgb(130, 86, 65)
            appearance: none
            border: 0
            background: url("../assets/pageSelect/angle1.png") no-repeat scroll 90% center transparent
            background-size: 16% 14%
          .select-hall
            z-index: 5
            margin: 7px 0 0 5px
            height: 36px
            line-height: 34px
            flex: 1
            overflow: hidden
            font-size: 14px
            color: rgb(7, 17, 27)
            text-align: center
            background: transparent
            &.active
              height: 300px
              .current-hall
                border-bottom: none
                border-bottom-left-radius: 0
                border-bottom-right-radius: 0
                background: #E1E5D0
            .current-hall
              position: relative
              border: 1px solid rgb(214, 214, 214)
              border-radius: 5px
              .angle
                position: absolute
                top: 13px
                right: 10px
                width: 10px
                height: 8px
            .hall
              border-left: 1px solid rgb(214, 214, 214)
              border-right: 1px solid rgb(214, 214, 214)
              background: #E1E5D0
              input
                height: 26px
                border-radius: 5px
                border: 1px solid rgb(214, 214, 214)
              &:last-child
                border-bottom: 1px solid rgb(214, 214, 214)
                border-bottom-left-radius: 5px
                border-bottom-right-radius: 5px
      .advice-submit
        position: absolute
        top: 116px
        line-height: 34px
        width: 100%
        height: 34px
        font-size: 16px
        color: #fff
        text-align: center
        letter-spacing: 10px
        background: rgb(130, 86, 65)
        border-radius: 3px
    .fade-enter-active, .fade-leave-active
      transition: all .5s
      opacity: 1
    .fade-enter, .fade-leave-to
      opacity: 0
</style>

<template>
  <transition name="fade">
    <div id="hall-select">
      <div class="reel">
        <h2 class="title">{{title}}</h2>
        <form action="#" class="form-donate">
          <label>选择...</label>
          <div class="flex-container">
            <div @click="selectCity" class="select-city">{{city}}</div>
            <transition name="fold">
              <div class="select-hall" :class="{'active': hallSelect}">
                <div class="current-hall"  @click="showSelect">
                  {{currentHall.title}}
                  <span v-show="halls.length === 0">当前城市无展览馆</span>
                  <img class="angle" src="../assets/pageSelect/angle2.png" v-show="halls.length !== 0">
                </div>
                <div class="close" :class="{'open': hallSelect}">
                  <div class="hall" v-show="halls.length !== 0"><input type="text" v-model="hallInput" class="input"></div>
                  <div v-for="item in hallList" :key="item.id" class="hall" :data-id="item.id" @click="chooseHall(item)">{{item.title}}</div>
                </div>
              </div>
            </transition>
          </div>
          <div class="advice-submit" @click="submit">{{result}}</div>
        </form>
      </div>
      <v-footer></v-footer>
    </div>
  </transition>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'hallSelect',
    data () {
      return {
        city: '全部',
        currentHall: {},
        halls: [],
        hallInput: '',
        hallSelect: false,
        title: '',
        flag: true,
        result: '提交'
      }
    },
    computed: {
      hallList () {
        let vm = this
        return this.halls.filter((el) => {
          return el.title.indexOf(vm.hallInput) !== -1
        })
      }
    },
    methods: {
      selectCity () {
        this.$router.push('/cityselect')
      },
      showSelect () {
        this.hallSelect = !this.hallSelect
      },
      submit () {
        if (this.flag) {
          this.flag = false
          let token = window.sessionStorage.getItem('token')
          let id = this.currentHall.id
          this.result = '正在提交...'
          this.$http.get(`User/checkExhibition?token=${token}&exhibition_id=${id}`)
            .then((res) => {
              this.title = this.currentHall.title
              this.flag = true
              this.result = '提交'
              window.sessionStorage.setItem('exhibition_id', id)
              window.sessionStorage.removeItem('intro')
              this.$router.push(`/?exhibition_id=${id}`)
            })
        }
      },
      chooseHall (item) {
        this.currentHall = item
        this.hallSelect = false
      }
    },
    created () {
      let intro = window.sessionStorage.getItem('intro')
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
      this._Global.hideMenu()
      this.title = JSON.parse(intro).title
    },
    mounted () {
      if (window.sessionStorage.getItem('city')) {
        this.city = window.sessionStorage.getItem('city')
      }
    },
    components: {
      'v-footer': footer
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        let city = window.sessionStorage.getItem('city') || '全部'
        vm.$http.get(`Exhibition/lists?city=${city}`)
          .then(res => {
            if (res.data) {
              vm.halls = res.data
              const exhibitionId = window.sessionStorage.getItem(`exhibition_id`)
              vm.currentHall = res.data.filter(obj => obj.id === exhibitionId)[0] || res.data[0]
            } else {
              vm.halls = []
              vm.currentHall = {}
            }
          })
      })
    }
  }</script>

<style lang="sass" scoped>
  #hall-select
    width: 100%
    min-height: 100vh
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
            z-index: 1000
            margin: 7px 0 0 5px
            height: 36px
            line-height: 34px
            width: 150px
            font-size: 14px
            color: rgb(7, 17, 27)
            text-align: center
            background: transparent
            position: relative
            &.active
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
                right: 0
                width: 10px
                height: 8px
            .hall
              position: relative
              z-index: 1000
              border-left: 1px solid rgb(214, 214, 214)
              border-right: 1px solid rgb(214, 214, 214)
              background: #E1E5D0
              width: 150px
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
        top: 200px
        line-height: 34px
        width: 100%
        height: 34px
        font-size: 16px
        color: #fff
        text-align: center
        letter-spacing: 10px
        background: rgb(130, 86, 65)
        border-radius: 3px
        z-index: auto
    .fade-enter-active, .fade-leave-active
      transition: all .5s
      opacity: 1
    .fade-enter, .fade-leave-to
      opacity: 0
  .open
    height: 300px
    overflow: scroll
    display: inline-block!important
  .close
    display: none
</style>

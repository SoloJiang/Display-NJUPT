<template>
  <transition name="move">
    <div id="city-result">
      <div class="list-wrapper" ref="resultWrapper">
        <ul>
          <li v-for="item in resultList"
              @click="selectCity(item, $event)"
              class="city-item">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'cityResult',
    props: {
      input: {
        type: String
      },
      city: {
        type: Object
      }
    },
    computed: {
      resultList () {
        let result = []
        for (let arr in this.city) {
          for (let i = 0; i < this.city[arr].length; i++) {
            if (this.city[arr][i].name.indexOf(this.input) !== -1) {
              result.push(this.city[arr][i].name)
            }
          }
        }
        return result
      }
    },
    methods: {
      selectCity (city, event) {
        if (!event._constructed) return
        window.sessionStorage.setItem('city', city)
        this.$router.push('/checkExhibition')
      }
    },
    beforeUpdate () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.resultWrapper, {
          click: true
        })
      })
    }
  }</script>

<style lang="sass" scoped>
  #city-result
    position: fixed
    top: 53px
    bottom: 50px
    left: 0
    width: 100%
    z-index: 10
    background: #fff
    .list-wrapper
      max-height: 564px
      overflow: hidden
      .city-item
        margin-right: 22px
        padding-left: 10px
        height: 34px
        line-height: 34px
        font-size: 14px
        color: #000
        border-bottom: 1px solid rgba(7, 17, 27, 0.2)
        &:last-child
          border: none

    &.move-enter-active, &.move-leave-active
      transition: all 0.5s
      transform: translate3d(0, 0, 0)
      opacity: 1
    &.move-enter, &.move-leave-to
      transform: translate3d(0, 100px, 0)
      opacity: 0
</style>

<template>
  <transition name="fade">
    <div id="city-select">
      <div class="searchbar">
        <i class="icon-search"></i>
        <input v-model="cityInput" type="text" class="input-search" placeholder="输入城市名">
      </div>
      <div class="current">
        <span class="pos">当前：{{currentCity}}</span>
      </div>
      <div class="city">
        <div class="current-city">
          <div class="title">定位城市</div>
          <div @click="rawSelectCity(currentCity)" class="city-item">
            <i class="icon-location"></i> {{currentCity}}
          </div>
        </div>
        <div class="hot-city">
          <div class="title">热门城市</div>
          <div class="hot-city-list">
          <div @click="rawSelectCity('全部')"
                 class="city-item">
              全部
            </div>
            <div v-for="item in hotCity['hot']"
                 @click="rawSelectCity(item.name)"
                 class="city-item">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="city-wrapper" ref="cityWrapper">
          <div class="city-slide">
            <div v-for="(group, index) in city" :key="index" class="city-list city-list-hook">
              <div class="alpha">{{index}}</div>
              <div v-for="item in group"
                   @click="selectCity(item.name, $event)"
                   class="city-item">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar">
        <ul style="margin-bottom: 50px">
          <li v-for="(item, index) in city"
              @click="selectAlpha(index)"
              :class="{'active': currentIndex === convertAlpha(index)}"
              class="nav-item">
            {{index}}
          </li>
        </ul>
      </div>
      <result v-show="showResult" :input="cityInput" :city="city"></result>
      <v-footer></v-footer>
    </div>
  </transition>
</template>

<script>
  /* eslint-disable no-unexpected-multiline,no-sequences */

  import footer from 'components/Footer'
  import CityResult from 'components/CityResult'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import city from '../assets/pageSelect/china-city-data.json'
  import hotCity from '../assets/pageSelect/hot-city-data.json'
  export default {
    name: 'citySelect',
    data () {
      return {
        currentCity: '定位中',
        city: city,
        hotCity: hotCity,
        heightList: [],
        scrollY: 0,
        cityInput: ''
      }
    },
    methods: {
      getCity (city) {
        this.currentCity = city
      },
      _initScroll () {
        this.scroll = new BScroll(this.$refs.cityWrapper, {
          probeType: 3,
          click: true
        })
        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let cityList = this.$refs.cityWrapper.getElementsByClassName('city-list-hook')
        let height = 0
        this.heightList.push(height)
        for (let i = 0; i < cityList.length; i++) {
          height += cityList[i].clientHeight
          this.heightList.push(height)
        }
      },
      selectAlpha (index) {
        let cityList = this.$refs.cityWrapper.getElementsByClassName('city-list-hook')
        let el = cityList[this.convertAlpha(index)]
        this.scroll.scrollToElement(el, 500)
      },
      convertAlpha (index) {
        const alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
        return alphaArr.indexOf(index)
      },
      rawSelectCity (city) {
        window.sessionStorage.setItem('city', city)
        this.$router.push('/checkExhibition')
      },
      selectCity (city, event) {
        if (!event._constructed) return
        window.sessionStorage.setItem('city', city)
        this.$router.push('/checkExhibition')
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i]
          let height2 = this.heightList[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
      },
      showResult () {
        if (this.cityInput !== '') return true
        return false
      }
    },
    created () {
      this._Global.getLocation(this.getCity)
      axios.all([axios.get('/api/Index/getCity'), axios.get('/api/Index/getHotCity')])
        .then(axios.spread((city, hotCity) => {
          this.city = city.data
          this.hotCity = hotCity.data
          this._initScroll()
          this._calculateHeight()
        }))
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    },
    components: {
      'v-footer': footer,
      'result': CityResult
    }
  }
</script>

<style lang="sass" scoped>
  #city-select
    background: #fff
    min-height: 100vh
    .searchbar
      position: relative
      padding-left: 10px
      border-bottom: 1px solid rgba(7, 17, 27, 0.2)
      .icon-search
        position: absolute
        top: 16px
        left: 19vh
        font-size: 20px
      .input-search
        width: calc(65% - 22px)
        margin: 10px 0
        padding-left: 22vh
        height: 30px
        font-size: 12px
        border: 1px solid rgba(7, 17, 27, 0.5)
        border-radius: 3px
        background: rgb(244, 244, 244)
    .current
      font-size: 12px
      .pos
        padding-left: 10px
        height: 40px
        line-height: 40px
      .county
        float: right
        select
          padding-left: 10px
          width: 72px
          height: 40px
          line-height: 40px
          font-size: 12px
          color: #999
          appearance: none
          border: none
          background: url("../assets/pageSelect/angle3.png") no-repeat scroll right center transparent
          background-size: 14%
    .city
      background: rgb(244, 244, 244)
      width: calc(100% - 22px)
      margin-bottom: 50px
      .current-city
        padding-left: 10px
        .title
          line-height: 40px
          font-size: 12px
          color: #999
        .city-item
          width: calc(100% / 3 - 12px)
          height: 30px
          line-height: 30px
          font-size: 12px
          text-align: center
          border: 1px solid rgba(7, 17, 27, 0.2)
          border-radius: 3px
          background: #fff
          .icon-location
            font-size: 14px
      .hot-city
        padding-left: 10px
        .title
          line-height: 40px
          font-size: 12px
          color: #999
        .hot-city-list
          display: flex
          flex-wrap: wrap
          .city-item
            margin-right: 10px
            margin-bottom: 10px
            width: calc(100% / 3 - 12px)
            height: 30px
            line-height: 30px
            font-size: 12px
            text-align: center
            border: 1px solid rgba(7, 17, 27, 0.2)
            border-radius: 3px
            background: #fff
            &:nth-of-type(3n)
              margin-right: 0
      .city-wrapper
        max-height: calc(100vh - 382px)
        overflow: hidden
        .city-list
          color: rgba(7, 17, 27, 0.4)
          background: #fff
          .alpha
            padding-left: 10px
            height: 34px
            line-height: 34px
            background: rgb(244, 244, 244)
          .city-item
            margin-left: 10px
            height: 34px
            line-height: 34px
            font-size: 14px
            color: #000
            border-bottom: 1px solid rgba(7, 17, 27, 0.2)
            &:last-child
              border: none
    .navbar
      display: flex
      position: absolute
      top: 8vh
      right: 0px
      flex-direction: column
      color: rgba(7, 17, 27, 0.7)
      .nav-item
        padding: 3px 5px
        font-size: 12px
        color: rgb(132, 89, 69)
        list-style: none
        &.active
          font-weight: 700
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7)
    @media screen and (max-width: 320px)
      .navbar
        top: 10vh
  .fade-enter-active, .fade-leave-active
    transition: all .5s
    opacity: 1
  .fade-enter, .fade-leave-to
    opacity: 0
</style>

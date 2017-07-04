<template>
  <div id="hall" @scroll="getMore"  ref="infoWrapper">
    <div class="hall-list">
      <div v-for="(item, index) in imgs" class="hall-item">
        <img :src="baseUrl+item.thumb" @click="routerDetail(item.id)">
        <div class="navbar">
          <div class="hall-select" @click="routerDetail(item.id)">{{item.title}}</div>
          <div class="hall-essence" @click="routerItem(item.id)">展品荟萃</div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  let encodeHtml = require('../utils/encodeHtml').encodeHtml
  export default {
    name: 'hall',
    data () {
      return {
        imgs: [],
        p: 1,
        baseUrl: this._Global.url,
        flag: true,
        totalnum: 0
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      this.getInfo(1, 6, false)
    },
    methods: {
      getInfo (p, num, more) {
        let type = this.$route.query.type
        let id = this.$route.query.exhibition_id
        this.$http.get(`Exhibition/hallLists?exhibition_id=${id}&type=${type}&p=${p}&num=${num}`)
          .then(res => {
            if (res.data.constructor === Array) {
              this.totalnum = window.sessionStorage.getItem('totalNum')
              res.data.forEach(item => {
                item.title = encodeHtml(item.title)
              })
              if (!more) {
                this.imgs = res.data
              } else {
                this.imgs = this.imgs.concat(res.data)
                this.p = this.p + 1
                this.flag = true
              }
            } else {
              this.totalnum = 0
              this.imgs = []
            }
          })
      },
      routerDetail (id) {
        this.$router.push(`/hall_detail?hall_id=${id}`)
      },
      routerItem (id) {
        this.$router.push(`/exhibit?hall_id=${id}`)
      },
      getMore () {
        let that = this
        let container = this.$refs.infoWrapper
        let scrollMax = container.scrollHeight
        if (that.flag && that.p * 6 < that.totalnum && scrollMax - container.scrollTop < 800) {
          this.flag = false
          this.getInfo(that.p, 6, true)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  #hall
    height: 100vh
    overflow: scroll
    .hall-list
      padding: 0 1vh
      margin-bottom: 50px
      .hall-item
        position: relative
        height: calc((100vh - 50px - 3vh) / 3)
        img
          width: 100%
          height: 100%
        .navbar
          display: flex
          position: absolute
          justify-content: space-between
          align-items: flex-end
          bottom: 0
          left: 0
          z-index: 10
          width: 100%
          height: 40%
          color: #fff
          background: linear-gradient(0deg, rgba(7, 17, 27, 0.7), rgba(0, 0, 0, 0))
          .hall-select
            padding: 3vh 3vh 1vh 3vh
          .hall-essence
            padding: 3vh 3vh 1vh 3vh
</style>

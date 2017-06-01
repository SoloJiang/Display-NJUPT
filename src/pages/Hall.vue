<template>
  <div id="hall">
    <div class="hall-list">
      <div v-for="(item, index) in imgs" class="hall-item">
        <img :src="baseUrl+item.thumb">
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
        baseUrl: this._Global.url
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      let type = this.$route.query.type
      this.getInfo(type, 1, 6)
    },
    methods: {
      getInfo (type, p, num) {
        let id = this.$route.query.exhibition_id
        this.$http.get(`Exhibition/hallLists?exhibition_id=${id}&type=${type}&p=${p}&num=${num}`)
          .then(res => {
            this.imgs = res.data
            this.imgs.forEach(item => {
              item.title = encodeHtml(item.title)
            })
          })
      },
      routerDetail (id) {
        this.$router.push(`/hall_detail?hall_id=${id}`)
      },
      routerItem (id) {
        this.$router.push(`/exhibit?hall_id=${id}`)
      }
    }
  }
</script>

<style lang="sass" scoped>
  #hall
    .hall-list
      max-height: calc(100vh - 50px - 3vh)
      padding: 0 1vh
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

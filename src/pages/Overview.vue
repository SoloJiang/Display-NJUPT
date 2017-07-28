<template>
  <div id="overview">
    <div class="info-wrapper" ref="infoWrapper" @scroll="getMore">
      <ul>
        <li v-for="(item, index) in imgs" :key="item" :data-index="index" class="info-item" @click="routerGo(item.id)">
          <img :src="baseUrl+item.thumb">
          <div class="text-wrapper">
            <p>{{item.title}}</p>
            <br>
            <p>发布时间：{{item.createTime}}</p>
          </div>
        </li>
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'

  export default {
    name: 'overview',
    data () {
      return {
        imgs: [],
        list: [{id: '0', title: '全部'}],
        navList: document.getElementsByClassName('nav-item'),
        baseUrl: this._Global.url,
        p: 1,
        activeId: 0,
        totalnum: 0,
        flag: true
      }
    },
    methods: {
      getInfo (p, num = 6, more) {
        this.$http.get(`News/lists?p=${p}&num=${num}`)
          .then(res => {
            if (res.data.constructor === Array) {
              this.totalnum = window.sessionStorage.getItem('totalNum')
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
      getMore () {
        let that = this
        let container = this.$refs.infoWrapper
        if (container) {
          let scrollMax = container.scrollHeight
          if (that.flag && that.p * 6 < that.totalnum && scrollMax - container.scrollTop < 520) {
            this.flag = false
            this.getInfo(that.p, 6, true)
          }
        }
      },
      routerGo (id) {
        this.$router.push(`/news_detail/${id}`)
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      let exhibitionId = this.$route.query.exhibition_id
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
      this.getInfo(1, 6)
    }
  }
</script>

<style lang="sass" scoped>
  #overview
    width: 100%
    min-height: 100vh
    .info-wrapper
      max-height: calc(100vh - 40px - 50px)
      overflow: scroll
      font-size: 14px
      .info-item
        display: flex
        margin-bottom: 10px
        width: 100%
        height: 130px
        align-items: center
        background: rgba(7, 17, 27, 0.3)
        img
          margin-left: 1vh
          height: 92%
          width: 180px
        .text-wrapper
          margin-left: 1.5vh
          color: #fff
          p
            margin-bottom: 0.5vh
</style>

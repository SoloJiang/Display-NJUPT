<template>
  <div id="essence">
    <div class="essence-wrapper" @scroll="getMore" ref="container">
      <div class="essence-list">
        <div v-for="img in imgList1" @click="routerGo(img.id)" class="essence-item" :key="img.id">
          <img :src="baseUrl+img.thumb">
          <div class="desc">{{img.title}}</div>
        </div>
      </div>
      <div class="essence-list">
        <div v-for="img in imgList2"  @click="routerGo(img.id)" class="essence-item" :exhibit="img.id">
          <img :src="baseUrl+img.thumb">
          <div class="desc">{{img.title}}</div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'

  export default {
    name: 'essence',
    data () {
      return {
        imgList1: [],
        imgList2: [],
        baseUrl: this._Global.url,
        page: 1,
        flag: true,
        id: Number
      }
    },
    created () {
      this.getInfo()
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    },
    components: {
      'v-footer': footer
    },
    methods: {
      getInfo () {
        const exhibitionId = this.$route.query.exhibition_id
        const key = this.$route.query.key
        this.$http.get(`Exhibition/exhibitSearch?exhibition_id=${exhibitionId}&key=${key}&p=${this.page}&num=10`)
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (i % 2) {
                this.imgList2.push(res.data[i])
              } else {
                this.imgList1.push(res.data[i])
              }
            }
          })
      },
      getMore () {
        let totalNum = window.sessionStorage.getItem('totalNum')
        let container = this.$refs.container
        if (container) {
          let scrollMax = container.scrollHeight
          if (this.flag && this.p * 10 < totalNum && scrollMax - container.scrollTop < 520) {
            this.getInfo()
            this.page++
          }
        }
      },
      routerGo (id) {
        let exhibitId = id
        if (exhibitId !== null) {
          this.$router.push(`exhibit_detail?exhibit_id=${exhibitId}`)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  #essence
    margin: 0 1vh 0 0
    font-size: 0
    .essence-list
      float: left
      margin-left: 1vh
      width: calc(50% - 1vh)
      margin-bottom: 50px
      .essence-item
        margin-bottom: 1vh
        img
          width: 100%
          height: auto
        .desc
          font-size: 14px
          color: #fff
          text-align: center
          background: rgb(159, 159, 159)
</style>

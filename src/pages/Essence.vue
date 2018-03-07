<template>
  <div id="essence" @scroll="getMore" ref="container">
    <div class="essence-wrapper">
      <div class="essence-list">
        <div v-for="img in imgList1" @click="routerGo(img.id)" class="essence-item" :key="img.id">
          <img :src="baseUrl+img.thumb">
          <div class="desc">{{img.title}}</div>
        </div>
      </div>
      <div class="essence-list">
        <div v-for="(img, index) in imgList2"  @click="routerGo(img.id)" class="essence-item" :exhibit="img.id" :key="index">
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
        check: Boolean,
        id: Number
      }
    },
    created () {
      let hallId = this.$route.query.hall_id
      if (hallId) {
        this.getInfo(true, hallId)
        this.check = true
        this.id = hallId
      } else {
        let exhibitionId = this.$route.query.exhibition_id
        this.getInfo(false, exhibitionId)
        this.check = false
        this.id = exhibitionId
      }
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this._Global.ready(intro.title, intro.desc, intro.thumb[0], window.location)
    },
    components: {
      'v-footer': footer
    },
    methods: {
      getInfo (flag, id) {
        let variable
        this.flag = false
        if (flag) {
          variable = `hall_id=${id}`
        } else {
          variable = `exhibition_id=${id}&type=1`
        }
        this.$http.get(`Exhibition/exhibitLists?${variable}&p=${this.page}&num=10`)
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (i % 2) {
                this.imgList2.push(res.data[i])
              } else {
                this.imgList1.push(res.data[i])
              }
            }
            this.page++
            this.flag = true
          })
      },
      getMore () {
        let totalNum = window.sessionStorage.getItem('totalNum')
        let container = this.$refs.container
        if (container) {
          let scrollMax = container.scrollHeight
          if (this.flag && (this.page - 1) * 10 < totalNum && scrollMax - container.scrollTop < 720) {
            this.getInfo(this.check, this.id)
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
  }</script>

<style lang="sass" scoped>
  #essence
    margin: 0 1vh 0 0
    font-size: 0
    max-height: 100vh
    overflow: scroll
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

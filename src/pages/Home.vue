<template>
  <div>
    <player :banners="banners" :baseUrl="baseUrl"></player>
    <index-search></index-search>
    <index-section :sections="sections"></index-section>
    <div class="footer"><a :href="href" class="copyRight">2017&copy;{{footerTitle}}</a></div>
  </div>
</template>

<script>
  import Player from 'components/Player'
  import IndexSearch from 'components/IndexSearch'
  import IndexSection from 'components/IndexSection'
  import axios from 'axios'

  export default {
    data () {
      return {
        banners: [],
        sections: [],
        baseUrl: this._Global.url,
        title: '',
        footerTitle: '',
        href: ''
      }
    },
    components: {
      Player,
      IndexSearch,
      IndexSection
    },
    created () {
      let exhibitionId = this.$route.query.exhibition_id
      axios.all([this.getBanners(exhibitionId), this.getSections(exhibitionId), this.getCopyright()])
        .then(axios.spread((banners, sections, copyRight) => {
          // Both requests are now complete
          this.banners = banners.data
          this.sections = sections.data
          this.footerTitle = copyRight.data.title
          this.href = copyRight.data.url
        }))
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this.$set(this.$parent._data, 'background', intro.background)
      this.title = intro.title || '展览馆'
      document.getElementsByTagName('title')[0].innerHTML = this.title
      this._Global.ready(this.title, intro.desc, intro.thumb[0], window.location)
    },
    methods: {
      getBanners (exhibitionId) {
        return this.$http.get(`Index/getBanner?exhibition_id=${exhibitionId}`)
      },
      getSections (exhibitionId) {
        return this.$http.get(`Index/getMenu?exhibition_id=${exhibitionId}`)
      },
      getCopyright () {
        return this.$http.post('Index/getCopyright')
      }
    },
    mounted () {
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this.title = intro.title || '展览馆'
      document.getElementsByTagName('title')[0].innerHTML = this.title
    }
  }</script>

<style scoped>
  .footer {
    margin-top: -36px;
    line-height: 36px;
    text-align: center;
    position: relative;
    z-index: 1000
  }
  .copyRight {
    font-size: 14px;
    color: #B3B3B2;
  }
</style>

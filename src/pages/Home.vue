<template>
  <div>
    <player :banners="banners" :baseUrl="baseUrl"></player>
    <index-search></index-search>
    <index-section :sections="sections"></index-section>
    <div class="footer">2017&copy;展览馆万事通</div>
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
        background: '',
        title: ''
      }
    },
    components: {
      Player,
      IndexSearch,
      IndexSection
    },
    created () {
      let exhibitionId = this.$route.query.exhibition_id
      axios.all([this.getBanners(exhibitionId), this.getSections(exhibitionId)])
        .then(axios.spread((banners, sections) => {
          // Both requests are now complete
          this.banners = banners.data
          this.sections = sections.data
        }))
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this.title = intro.title
      document.getElementsByTagName('title')[0].innerHTML = this.title
    },
    methods: {
      getBanners (exhibitionId) {
        return this.$http.get(`Index/getBanner?exhibition_id=${exhibitionId}`)
      },
      getSections (exhibitionId) {
        return this.$http.get(`Index/getMenu?exhibition_id=${exhibitionId}`)
      }
    },
    mounted () {
      let intro = JSON.parse(window.sessionStorage.getItem('intro'))
      this.title = intro.title
      document.getElementsByTagName('title')[0].innerHTML = this.title
    }
  }
</script>

<style scoped>
  .footer {
    margin-top: -36px;
    line-height: 36px;
    font-size: 14px;
    color: #B3B3B2;
    text-align: center;
  }
</style>

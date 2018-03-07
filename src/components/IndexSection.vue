<template>
  <div class="section">
    <div  v-for="(item, index) in sections" :keys="item.id" class="href-body" @click="routerGo(index)">
      <img :src="baseUrl+item.thumb" class="href-img">
      <div class="href-tip">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        router: null,
        baseUrl: this._Global.url
      }
    },
    props: {
      sections: {
        type: Array
      }
    },
    methods: {
      routerGo (index) {
        let name = this.sections[index].name
        if (name.indexOf('https://') > -1 || name.indexOf('http://') > -1) {
          window.location = name
        } else {
          let exhibitionId = window.sessionStorage.getItem('exhibition_id')
          if (name.indexOf('?') > -1) {
            this.$router.push(`${name}&exhibition_id=${exhibitionId}`)
          } else if (name === 'global_news') {
            let title = this.sections[index].title
            window.sessionStorage.setItem('page_title', title)
            this.$router.push(name)
          } else {
            this.$router.push(`${name}?exhibition_id=${exhibitionId}`)
          }
        }
      }
    }
  }</script>

<style lang="sass" scoped>
  .section
    display: flex
    margin-top: 20px
    padding-bottom: 36px
    height: 254px
    flex-direction: column
    flex-wrap: wrap
    overflow-x: auto
    -webkit-overflow-scrolling: touch
  ::-webkit-scrollbar
    visibility: hidden
  .href-body
    position: relative
    display: inline-block
    margin-left: 8px
  .href-img
    margin-top: 4px
    width: 160px
    height: 110px
    background: #5950A4
  .href-tip
    position: absolute
    top: 90px
    line-height: 24px
    width: 160px
    height: 24px
    font-size: 12px
    color: #fff
    text-align: center
    background-color: rgba(0, 0, 0, .6)
</style>

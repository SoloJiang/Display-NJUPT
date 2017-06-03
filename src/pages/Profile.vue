<template>
  <div id="profile">
    <div class="header-wrapper">
      <div class="avatar">
        <img :src="avatarUrl" alt="avatar">
        <div class="desc">{{ username }} @ {{ currentHall }}</div>
      </div>
    </div>
    <div class="content">
      <div v-for="item in items" :key="item.id" @click="routerGo(item.path)">
        <span class="content-desc">{{ item.desc }}</span>
        <i class="icon-angle-right"></i>
      </div>
    </div>
    <v-footer :show="false"></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'profile',
    data () {
      return {
        username: '',
        currentHall: '',
        avatarUrl: null,
        items: [
          {
            id: 1,
            desc: '选择展览馆',
            path: '/checkExhibition'
          },
          {
            id: 2,
            desc: '预约',
            path: '/Order'
          },
          {
            id: 3,
            desc: '意见建议',
            path: '/feedback'
          },
          {
            id: 4,
            desc: '捐赠',
            path: '/donate'
          },
          {
            id: 5,
            desc: '二维码分享',
            path: '/QRCode'
          }
        ]
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      this.$http.get(`User/getUserInfo?token=${window.sessionStorage.getItem('token')}`)
        .then(res => {
          this.username = res.data.nickname
          this.avatarUrl = res.data.headimgurl
        })
      this.currentHall = JSON.parse(window.sessionStorage.getItem('intro')).title
      this._Global.hideMenu()
    },
    methods: {
      routerGo (path) {
        if (path !== undefined) {
          this.$router.push(path)
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  #profile
    background: #fff
    min-height: 100vh
    .header-wrapper
      width: 100%
      height: 30vh
      background: url("../assets/pageProfile/center-header.jpg")
      background-size: 100% 100%
      .avatar
        text-align: center
        img
          margin-top: 5vh
          width: 17vh
          height: 17vh
        .desc
          margin-top: 8px
          font-size: 18px
          color: rgb(255, 255, 255)
    .content
      margin-top: 40px
      padding: 14px 20px 0 20px
      .content-desc
        display: inline-block
        line-height: 50px
        vertical-align: top
        font-size: 16px
      .icon-angle-right
        float: right
        padding: 17px
        width: 16px
        height: 16px
        font-size: 16px
        text-align: center
      & > div
        padding-top: 0
        height: 50px
        font-size: 0
        border-top: 1px solid rgba(7, 17, 27, 0.2)
        &:last-child
          border-bottom: 1px solid rgba(7, 17, 27, 0.2)
</style>

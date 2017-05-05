<template>
  <div id="profile">
    <div class="header-wrapper">
      <div class="avatar">
        <img :src="avatarUrl" alt="avatar">
        <div class="desc">{{ username }} @ {{ currentHall }}</div>
      </div>
    </div>
    <div class="content">
      <div v-for="item in items" :key="item.id">
        <span class="content-icon"><i :class="'icon-' + item.icon"></i></span>
        <span class="content-desc">{{ item.desc }}</span>
        <i class="icon-angle-right"></i>
      </div>
    </div>
    <div class="logout">退出当前账户</div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  export default {
    name: 'profile',
    props: {
      username: {
        type: String,
        default: '王杰'
      },
      currentHall: {
        type: String,
        default: '中山陵博物馆'
      }
    },
    data () {
      return {
        avatarUrl: null,
        items: [
          {
            id: 1,
            desc: '意见建议',
            icon: 'pencil'
          },
          {
            id: 2,
            desc: '捐赠',
            icon: 'heart-o'
          },
          {
            id: 3,
            desc: '预约',
            icon: 'alarm'
          },
          {
            id: 4,
            desc: '二维码分享',
            icon: 'qrcode'
          }
        ]
      }
    },
    components: {
      'v-footer': footer
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '个人中心'
      this.avatarUrl = require('../assets/pageProfile/avatar.png')
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/fonts/icon"
  #profile
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
      padding: 14px 20px 0 20px
      .content-icon
        i[class ^= 'icon-']
          display: inline-block
          margin: 16px 10px 0 10px
          vertical-align: top
          width: 16px
          height: 16px
          font-size: 16px
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
    .logout
      margin: 24px 20px 0 20px
      line-height: 50px
      height: 50px
      font-size: 16px
      text-align: center
      color: #fff
      border-radius: 4px
      background: rgb(130, 85, 62)
</style>

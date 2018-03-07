<template>
  <div class="footer" v-show="display">
    <div class="back-btn" @click="back" v-if="show">
      <i class="icon-angle-left" :style="{color: iconColor}"></i>
    </div>
    <a class="rights" :href="href" :style="{color: fontColor}">2017 &copy; {{title}}</a>
    <div class="home-btn" @click="home">
      <i class="icon-home" :style="{color: iconColor}"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        title: '',
        href: ''
      }
    },
    props: {
      fontColor: {
        type: String
      },
      iconColor: {
        type: String
      },
      show: {
        type: Boolean,
        default: true
      },
      display: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      home () {
        this.$router.push('/')
      }
    },
    mounted () {
      this.$http.post('Index/getCopyright')
        .then(res => {
          this.title = res.data.title
          this.href = res.data.url
        })
    }
  }</script>

<style lang="sass" scoped>
  .footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 50px
    text-align: center
    background: rgba(255, 255, 255, 0.8)
    z-index: 1000
    .back-btn
      position: absolute
      top: 0
      left: 16px
      padding: 10px 20px
      .icon-angle-left
        font-size: 26px
        color: rgb(128, 128, 128)
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7)
    .rights
      line-height: 50px
      font-size: 14px
      color: #808080
    .home-btn
      position: absolute
      top: 0
      right: 20px
      padding: 10px
      .icon-home
        font-size: 26px
        color: rgb(128, 128, 128)
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7)
</style>

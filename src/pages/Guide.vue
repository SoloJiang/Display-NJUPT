<template>
  <div id="museum-guide">
    <div class="reel">
      <div class="content">
        <div class="desc-wrapper" ref="descWrapper">
          <div class="desc">
            <p>
              中山陵是中国近代伟大的民主革命先行者孙中山先生的陵寝，及其附属纪念建筑群，面积8万余平方米。中山陵自1926年春动工，至1929年夏建成，1961年成为首批全国重点文物保护单位，2006年列为首批国家重点风景名胜区和国家5A级旅游景区，2016年入选“首批中国20世纪建筑遗产”名录。</p>
            <p>
              中山陵位于南京市玄武区紫金山南麓钟山风景区内，前临平川，背拥青嶂，东毗灵谷寺，西邻明孝陵，整个建筑群依山势而建，由南往北沿中轴线逐渐升高，主要建筑有博爱坊、墓道、陵门、石阶、碑亭、祭堂和墓室等，排列在一条中轴线上，体现了中国传统建筑的风格，从空中往下看，像一座平卧在绿绒毯上的“自由钟”。融汇中国古代与西方建筑之精华，庄严简朴，别创新格。</p>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from 'components/Footer'
  import BScroll from 'better-scroll'

  export default {
    name: 'museum-guide',
    components: {
      'v-footer': footer
    },
    created () {
      document.getElementsByTagName('title')[0].innerHTML = '参观指南'

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.descWrapper, {
            click: true
          })
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
  @import "../assets/fonts/icon"
  #museum-guide
    width: 100%
    min-height: 100vh
    background: url("../assets/pageMuseum/reel-background.png") 50% no-repeat
    background-size: 200% 100%
    .reel
      padding: 0 10vh
      height: 92vh
      background: url("../assets/pageMuseum/reel.png") 50% no-repeat
      background-size: 95% 95%
      .content
        padding-top: 16vh
        .desc-wrapper
          max-height: 60vh
          overflow: hidden
          .desc
            font-size: 14px
            text-indent: 2em
</style>

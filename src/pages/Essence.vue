<template>
  <div id="essence">
    <div class="essence-list">
      <div v-for="img in imgs" class="essence-item">
        <img :src="img">
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
        imgs: {
          type: Array,
          default: []
        }
      }
    },
    created () {
      let img1 = require('../assets/pageMuseum/exhibition-1.jpg')
      let img2 = require('../assets/pageMuseum/exhibition-2.jpg')
      let img3 = require('../assets/pageMuseum/exhibition-3.jpg')
      let img4 = require('../assets/pageMuseum/exhibition-4.jpg')
      let img5 = require('../assets/pageMuseum/exhibition-5.jpg')
      this.imgs = [img1, img2, img3, img4, img5, img1, img2, img3]
    },
    components: {
      'v-footer': footer
    }
  }
</script>

<style lang="sass" scoped>
  #essence
    .essence-list
      .essence-item
        display: inline-block
        vertical-align: top
        width: 50%
        img
          width: 100%
</style>

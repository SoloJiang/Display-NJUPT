<template>
  <div>
    <player></player>
    <index-search></index-search>
    <index-section></index-section>
    <div class="footer">2017&copy;展览馆万事通</div>
  </div>
</template>

<script>
  import Player from 'components/Player.vue'
  import IndexSearch from 'components/IndexSearch.vue'
  import IndexSection from 'components/IndexSection.vue'

  export default {
    components: {
      Player,
      IndexSearch,
      IndexSection
    }
  }
</script>

<style scoped>
  .footer {
    font-size: 14px;
    color: #B3B3B2;
    text-align: center;
    margin-top: -36px;
    line-height: 36px;
  }
</style>

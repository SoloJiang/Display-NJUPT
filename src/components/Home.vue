<template>
  <div>
    <player></player>
    <index-search></index-search>
    <index-section></index-section>
  </div>
</template>

<script>
  import Player from './Player.vue'
  import IndexSearch from './IndexSearch.vue'
  import IndexSection from './IndexSection.vue'

  export default {
    components: {
      Player,
      IndexSearch,
      IndexSection
    }
  }
</script>

<style>
</style>

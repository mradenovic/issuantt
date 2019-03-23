<template>
  <div>
    <pagination-stats />
    <pagination-links />
  </div>
</template>

<script>
import PaginationLinks from './PaginationLinks.vue'
import PaginationStats from './PaginationStats.vue'

export default {
  name: 'pagination',
  components: {
    PaginationStats,
    PaginationLinks
  }
}
</script>

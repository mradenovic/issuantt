<template>
  <div>
    <div class="level">
      <div class="level-item">
        <pagination-stats />
      </div>

      <div class="level-item">
        <pagination-links />
      </div>
    </div>
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

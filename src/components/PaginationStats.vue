<template>
  <div>
    Page {{ page }} of {{ totaPages }} at
    <select v-model="perPageItems">
      <option v-for="value in [10,20,50,75,100]" :value="value" :key="value">{{ value }}</option>
    </select>
    items per page.

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pagination-stats',
  computed: {
    ...mapState('pagination', {
      page: state => state.page,
      totaPages: state => state.totalPages,
      perPageItems: state => state.perPageItems,
      totalItems: state => state.totalItems
    }),
    perPageItems: {
      get () {
        return this.$store.state.pagination.perPageItems
      },
      set (value) {
        this.$store.commit('pagination/perPageItems', value)
      }
    }
  }
}
</script>

<template>
  <div>
    {{ firstTaskOrd }} - {{ lastTaskOrd }} of {{ totalItems }} tasks
    on page {{ page }} of {{ totaPages }} at
    <select v-model="perPageItems">
      <option v-for="value in [10,20,50,75,100]" :value="value" :key="value">{{ value }}</option>
    </select>
    tasks per page.

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'pagination-stats',
  computed: {
    ...mapState('pagination', {
      page: state => state.page,
      totaPages: state => state.totalPages,
      perPageItems: state => state.perPageItems,
      totalItems: state => state.totalItems
    }),
    ...mapGetters({
      firstTaskOrd: 'pagination/firstTaskOrd',
      lastTaskOrd: 'pagination/lastTaskOrd'
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

<template>
  <div>
    <div v-if="issues && issues.length">
      <nav>
        <pagination></pagination>
      </nav>

      <tasks :issues="issues"/>

      <nav>
        <pagination></pagination>
      </nav>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Tasks from './Tasks.vue'

export default {
  name: 'page',
  components: {
    Tasks,
    Pagination
  },
  computed: {
    issues () {
      return this.$store.state.issue.issues
    }
  }
}
</script>

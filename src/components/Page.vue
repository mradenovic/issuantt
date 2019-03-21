<template>
  <div>
    <div v-if="!issues || !issues.length">You have no issues! Great! Right!?</div>
    <div v-if="issues && issues.length">
      <nav>
        <pagination></pagination>
      </nav>

      <tasks v-bind="{...customStrings, issues}"/>

      <nav>
        <pagination></pagination>
      </nav>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Tasks from './Tasks.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'page',
  components: {
    Tasks,
    Pagination
  },
  computed: {
    issues () {
      return this.$store.state.issue.issues
    },
    ...mapGetters({
      customStrings: 'env/customStrings'
    })
  }
}
</script>

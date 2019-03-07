<template>
  <div>
    <section class="section">

      <sign-out/>

      <sign-in/>
    </section>

    <section class="section">
      <issue-search/>
      <error/>

      <div v-if="issues && issues.length">
        <pagination></pagination>

        <tasks :issues="issues"/>

        <pagination></pagination>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import SignIn from './SignIn.vue'
import SignOut from './SignOut.vue'
import IssueSearch from './IssueSearch.vue'
import Error from './Error.vue'
import Tasks from './Tasks.vue'

export default {
  name: 'page',
  components: {
    Tasks,
    Error,
    Pagination,
    SignIn,
    SignOut,
    IssueSearch
  },
  computed: {
    issues () {
      return this.$store.state.issue.issues
    }
  }
}
</script>

<template>
  <div>
    <section class="section">

      <sign-out/>

      <sign-in/>
    </section>

    <section class="section">
      <issue-search/>

      <div v-if="issues && issues.length">
        <!-- <pagination v-bind:links="links" v-on:pagination-click="getIssues"></pagination> -->

        <div v-for="issue of issues" v-bind:key="issue.id">
          {{ issue.number || issue.iid }} {{ issue.title }} {{ issue.state }}
        </div>

        <!-- <pagination v-bind:links="links" v-on:pagination-click="getIssues"></pagination> -->
      </div>
    </section>
  </div>
</template>

<script>
// import Pagination from './Pagination.vue'
import SignIn from './SignIn.vue'
import SignOut from './SignOut.vue'
import IssueSearch from './IssueSearch.vue'

export default {
  name: 'page',
  components: {
    SignIn,
    SignOut,
    IssueSearch
    // Pagination
  },
  computed: {
    issues () {
      return this.$store.state.issue.issues
    }
  }
}
</script>

<template>
  <!-- SignOut Header -->
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <label>Project / Repo</label>
        </div>
        <div class="column is-4">
          <repo-filter></repo-filter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RepoFilter from './RepoFilter.vue'

export default {
  name: 'issue-search',
  components: {
    RepoFilter
  }
}
</script>

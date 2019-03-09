<template>
  <!-- Issues filter -->
  <div>
    <div class="">
      <div class="columns">
        <div class="column is-4">
          <label>Project / Repo</label>
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

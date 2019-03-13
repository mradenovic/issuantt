<template>
  <!-- Issues filter -->
  <div>
    <div class="">
      <div class="columns">
        <div class="column is-4">
          <label>Project / Repo</label>
          <project-filter></project-filter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectFilter from './ProjectFilter.vue'

export default {
  name: 'issue-search',
  components: {
    ProjectFilter
  }
}
</script>

<template>
  <!-- SignOut Header -->
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <label>Project / Repo</label>
        </div>
        <div class="column is-4">
          <multiselect
            v-model="project"
            :options="projects"
            :close-on-select="true"
            :show-labels="false"
            :loading="loading"
            placeholder="Type to search a repository"
            :label="label"
            @search-change="searchProjects"
            @input="listProjectIssues">
          ></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce'
import Multiselect from 'vue-multiselect'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'issue-search',
  components: {
    Multiselect
  },
  computed: {
    ...mapState({
      projects: state => state.repo.projects,
      loading: state => state.loading
    }),
    ...mapGetters({
      label: 'repo/label'
    }),
    project: {
      get () {
        return this.$store.state.repo.project
      },
      set (value) {
        this.$store.commit('repo/project', value)
      }
    }
  },
  methods: {
    ...mapActions('repo', [
      'refreshProjects'
    ]),
    listProjectIssues () {

    },
    searchProjects: debounce(function (query) {
      if (query.length !== 0) {
        this.refreshProjects(query)
      }
    }, 750)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

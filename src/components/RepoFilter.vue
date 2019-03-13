<template>
  <div>
    <multiselect
      v-model="project"
      :options="projects"
      :close-on-select="true"
      :show-labels="false"
      :loading="loading"
      placeholder="Type to search a repository"
      :label="label"
      @search-change="searchProjects"
      @input="refreshIssues(null)">
    ></multiselect>
  </div>
</template>

<script>
import debounce from 'debounce'
import Multiselect from 'vue-multiselect'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'repo-filter',
  components: {
    Multiselect
  },
  computed: {
    ...mapState({
      projects: state => state.filter.projects,
      loading: state => state.loading
    }),
    ...mapGetters({
      label: 'filter/label'
    }),
    project: {
      get () {
        return this.$store.state.filter.project
      },
      set (value) {
        this.$store.commit('filter/project', value)
      }
    }
  },
  methods: {
    ...mapActions('filter', [
      'refreshProjects'
    ]),
    ...mapActions('issue', [
      'refreshIssues'
    ]),
    searchProjects: debounce(function (query) {
      if (query.length !== 0) {
        this.refreshProjects(query)
      }
    }, 750)
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<template>
  <div>
    <h1>Issues</h1>
    <div v-for="example of examples" :key="example">
      <a href="#" v-on:click="getIssues(example)">{{ example }}</a>
    </div>

    <div v-if="issues && issues.length">
      <pagination v-bind:links="links" v-on:pagination-click="getIssues"></pagination>

      <div v-for="issue of issues" v-bind:key="issue.id">
        {{ issue.number || issue.iid }} {{ issue.title }} {{ issue.state }}
      </div>

      <pagination v-bind:links="links" v-on:pagination-click="getIssues"></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Provider from '../mixins/Provider.js'

export default {
  name: 'issues',
  components: {
    Pagination
  },
  mixins: [
    Provider
  ],
  data: function () {
    return {
      examples: [
        'https://gitlab.com/api/v4/projects/10997765/issues',
        'https://api.github.com/repos/angular/angular/issues',
        'https://api.github.com/repos/angular/angular/issues?per_page=10'
      ],
      linkHeader: null,
      links: null,
      issues: []
    }
  },
  methods: {
    getLinks (linkHeader) {
      let re = /<(\S*)>;[\s]*rel="([a-z]+)"/g
      let arrRes = []
      let links = {}

      while ((arrRes = re.exec(linkHeader)) !== null) {
        links[arrRes[2]] = arrRes[1]
      }
      return links
    },
    getIssues (issuesUrl) {
      if (!issuesUrl) return

      this.api.get(issuesUrl)
        .then(response => {
          this.linkHeader = response.headers['link']
          this.links = this.getLinks(this.linkHeader)
          this.issues = response.data
        })
    }
  }
}
</script>

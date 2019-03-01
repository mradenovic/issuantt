<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">
          Issues
        </h1>
      </div>

      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item" v-for="p of providers" :key="p">
            <div>
              <button class="button is-rounded is-info" :class="{'is-inverted': p !== provider}" @click="setProvider(p)">
                <i :class="['fa fa-' + p]"></i>
              </button>
            </div>
          </div>

          <div class="level-item">
            <input placeholder="Private token" class="input" tabindex="2" v-model="providerToken" v-on:keyup.enter="signin">
          </div>

          <div class="level-item">
            <input placeholder="Custom address" class="input" tabindex="1" v-model="providerURL" v-on:keyup.enter="signin" v-bind:disabled="provider != 'gitlab'">
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"><a class="button is-info">Sign In</a></p>
        </div>
      </nav>
    </section>

    <section class="section">
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
    </section>
  </div>
</template>

<script>
import Pagination from './Pagination.vue'
import Provider from '../mixins/Provider.js'

export default {
  name: 'page',
  components: {
    Pagination
  },
  mixins: [
    Provider
  ],
  data: function () {
    return {
      examples: [
        '/issues',
        'https://gitlab.com/api/v4/projects/10997765/issues',
        'https://api.github.com/repos/angular/angular/issues',
        'https://api.github.com/repos/angular/angular/issues?per_page=10'
      ],
      providers: [
        'gitlab',
        'github'
      ],
      linkHeader: null,
      links: null,
      issues: []
    }
  },
  methods: {
    setProvider (provider) {
      this.provider = provider
    },
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

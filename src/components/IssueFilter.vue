<template>
  <div class="level">
    <div class="level-item">
      <input placeholder="search for issues" class="input" v-model="search" v-on:keyup.enter="updateRoute(null)">
    </div>

    <div class="level-right">
      <div class="level-item">
        <button class="button is-info is-round" :class="{'is-loading': loading}" @click="updateRoute(null)">Go</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'issue-filter',
  mounted () {
    this.updateSearchBox()
  },
  watch: {
    '$route' (to, from) {
      this.updateSearchBox()
    }
  },
  computed: {
    ...mapState([
      'loading'
    ]),
    search: {
      get () {
        return this.$store.state.filter.search
      },
      set (value) {
        this.$store.commit('filter/search', value)
      }
    }
  },
  methods: {
    ...mapActions('issue', [
      'refreshIssues'
    ]),
    updateSearchBox () {
      const q = this.$route.query.q
      if (q) {
        this.search = q
        this.refreshIssues()
      }
    },
    updateRoute () {
      const q = this.search
      // update document title
      document.title = `Issuantt ${q}`
      // update route
      this.$router.push({ query: { q: q } })
      this.refreshIssues()
    }
  }
}
</script>

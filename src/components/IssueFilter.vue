<template>
  <div class="level">
    <div class="level-item">
      <input placeholder="search for issues" class="input" v-model="search" v-on:keyup.enter="refreshIssues(null)">
    </div>

    <div class="level-right">
      <div class="level-item">
        <button class="button is-info is-round" :class="{'is-loading': loading}" @click="refreshIssues(null)">Go</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'issue-filter',
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
    ])
  }
}
</script>

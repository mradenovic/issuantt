<template>
  <div>
    <div v-if="links">
      <div v-for="rel of ['first', 'prev', 'next', 'last']" v-bind:key="rel"  style="display: inline-block;">
        <button class="button is-rounded is-info is-small" v-on:click="refreshIssues(links[rel])" v-bind:disabled="!links[rel]">{{ linkTitles[rel] }} </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pagination-links',
  data: function () {
    return {
      linkTitles: {
        first: '<< first',
        prev: '< prev',
        next: 'next >',
        last: 'last >>'
      }
    }
  },
  computed: {
    ...mapState('pagination', {
      links: state => state.links
    })
  },
  methods: {
    ...mapActions('issue', [
      'refreshIssues'
    ])
  }
}
</script>

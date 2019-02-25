<template>
  <div>
    <div v-if="links">
      <div v-for="rel of ['first', 'prev', 'next', 'last']" v-bind:key="rel"  style="display: inline-block;">
        <button v-on:click="$emit('pagination-click', links[rel])" v-bind:disabled="!links[rel]">{{ linkTitles[rel] }} </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    links: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      linkTitles: {
        first: '<< first',
        prev: '< prev',
        next: 'next >',
        last: 'last >>'
      }
    }
  }
}
</script>

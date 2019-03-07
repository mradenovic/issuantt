<template>
  <div class="content has-text-danger">{{ error }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'error',
  computed: {
    ...mapState([
      'error'
    ])
  }
}
</script>

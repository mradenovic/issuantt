<template>
  <!-- SignOut Header -->
  <nav class="level is-mobile" v-if="user">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <figure class="image is-32x32">
          <a :href="user.web_url || user.html_url">
            <img class="is-rounded" v-bind:src="user.avatar_url">
          </a>
        </figure>
      </div>

      <div class="level-item">
        <span>{{ user.name }}</span>
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <div class="level-item">
        <a class="button is-info" @click="signOut">
          <span>Sign Out</span>
          <span class="icon">
            <i :class="['fa fa-' + provider]"></i>
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sign-out',
  computed: {
    ...mapState([
      'user',
      'provider'
    ])
  },
  methods: {
    ...mapActions([
      'signOut'
    ])
  }
}
</script>

<template>
<!-- SignIn Header -->
  <nav class="level" v-if="!user">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item" v-for="p of providers" :key="p">
        <div>
          <button class="button is-rounded is-info" :class="{'is-inverted': p !== provider, 'is-loading': p == provider && loading}" @click="setProvider(p)">
            <i :class="['fa fa-' + p]"></i>
          </button>
        </div>
      </div>

      <div class="level-item">
        <input placeholder="Private token" class="input" tabindex="2" v-model="providerToken" v-on:keyup.enter="signIn">
      </div>

      <div class="level-item">
        <input placeholder="Custom address" class="input" tabindex="1" v-model="providerURL" v-on:keyup.enter="signIn">
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <label class="checkbox level-item">
        <input type="checkbox" v-model="rememberMe">
        Remember me
      </label>
      <p class="level-item"><a class="button is-info" @click="signIn">Sign In</a></p>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'sign-in',
  computed: {
    providerURL: {
      get () {
        return this.$store.getters.providerURL
      },
      set (value) {
        this.$store.commit('providerURL', value)
      }
    },
    providerToken: {
      get () {
        return this.$store.getters.providerToken
      },
      set (value) {
        this.$store.commit('providerToken', value)
      }
    },
    rememberMe: {
      get () {
        return this.$store.state.rememberMe
      },
      set (value) {
        this.$store.commit('rememberMe', value)
      }
    },
    ...mapState([
      'providers',
      'user',
      'loading',
      'provider'
    ])
  },
  methods: {
    ...mapActions([
      'initProvider',
      'setProvider',
      'signIn'
    ])
  },
  mounted () {
    this.initProvider()
  }
}
</script>

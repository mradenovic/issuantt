import { mapState, mapActions } from 'vuex'

export default {
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
      'api',
      'loading',
      'provider'
    ])
  },
  watch: {
    provider: function () {
      this.signOut()
    }
  },
  methods: {
    ...mapActions([
      'setProvider',
      'signIn',
      'signOut'
    ])
  },
  mounted () {
    this.setProvider('gitlab')
  }
}

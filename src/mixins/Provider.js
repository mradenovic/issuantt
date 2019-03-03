import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    providerURL: {
      get () {
        return this.$store.state.providerURL
      },
      set (value) {
        this.$store.commit('providerURL', value)
      }
    },
    providerToken: {
      get () {
        return this.$store.state.providerToken
      },
      set (value) {
        this.$store.commit('providerToken', value)
      }
    },
    ...mapState([
      'providers',
      'user',
      'api',
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

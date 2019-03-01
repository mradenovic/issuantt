import axios from 'axios'

export default {
  data: function () {
    return {
      user: null,
      api: axios,
      providerURL: 'https://gitlab.com',
      provider: 'gitlab',
      providerToken: null
    }
  },
  computed: {
    baseURL () {
      switch (this.provider) {
        case 'gitlab':
          return `${this.providerURL}/api/v4`
        case 'github':
          return 'https://api.github.com/'
        default:
          return null
      }
    },
    headers () {
      console.log('headers in')
      if (!this.providerToken) {
        return null
      }

      switch (this.provider) {
        case 'gitlab':
          return { 'PRIVATE-TOKEN': `${this.providerToken}` }
        case 'github':
          return { 'Authorization': `token ${this.providerToken}` }
        default:
          return null
      }
    },
    config () {
      const config = {
        baseURL: this.baseURL
      }

      if (this.headers) {
        config['headers'] = this.headers
      }

      return config
    }
  },
  watch: {
    config: function (value) {
      this.api = axios.create(value)
    }
  },
  methods: {
    signIn () {
      this.api.get('/user')
        .then(response => {
          this.user = response.data
        })
    }
  }
}

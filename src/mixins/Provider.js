import axios from 'axios'

export default {
  data: function () {
    return {
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
    api () {
      const config = {
        baseURL: this.baseURL
      }

      if (this.headers) {
        config['headers'] = this.headers
      }

      return axios.create(config)
    }
  },
  methods: {
  }
}

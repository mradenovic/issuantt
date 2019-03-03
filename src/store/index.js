import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // list of suupported providers
    providers: [
      'gitlab',
      'github'
    ],
    user: null,
    api: axios,
    provider: 'null',
    providerURL: 'https://gitlab.com',
    providerToken: null
  },
  mutations: {
    user: function (state, value) {
      state.user = value
    },
    api: function (state, value) {
      state.api = value
    },
    provider: function (state, value) {
      state.provider = value
    },
    providerURL: function (state, value) {
      state.providerURL = value
    },
    providerToken: function (state, value) {
      state.providerToken = value
    }
  },
  getters: {
    baseURL (state) {
      switch (state.provider) {
        case 'gitlab':
          return `${state.providerURL}/api/v4`
        case 'github':
          return 'https://api.github.com/'
        default:
          return null
      }
    },
    headers (state) {
      if (!state.providerToken) {
        return null
      }

      switch (state.provider) {
        case 'gitlab':
          return { 'PRIVATE-TOKEN': `${state.providerToken}` }
        case 'github':
          return { 'Authorization': `token ${state.providerToken}` }
        default:
          return null
      }
    }
  },
  actions: {
    setProvider ({ commit }, provider) {
      commit('provider', provider)
    },
    signIn ({ state, getters, commit }) {
      const { baseURL, headers } = getters

      commit('api', axios.create({ baseURL, headers }))
      state.api.get('/user')
        .then(response => {
          commit('user', response.data)
        })
    },
    signOut ({ getters, commit }) {
      const { baseURL } = getters

      commit('user', null)
      commit('api', axios.create({ baseURL }))
    }
  }
})

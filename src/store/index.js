import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import repo from './modules/repo'
import issue from './modules/issue'
import pagination from './modules/pagination'
import gitlab from './modules/gitlab'
import github from './modules/github'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    github,
    gitlab,
    pagination,
    issue,
    repo
  },
  state: {
    // list of suupported providers
    providers: [
      'gitlab',
      'github'
    ],
    user: null,
    api: axios,
    loading: false,
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
    loading: function (state, value) {
      state.loading = value
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
    getResponseItems: (state, getters) => (data) => {
      return getters[`${state.provider}/getResponseItems`](data)
    },
    baseURL (state, getters) {
      return getters[`${state.provider}/baseURL`]
    },
    headers (state, getters) {
      return getters[`${state.provider}/headers`]
    }
  },
  actions: {
    setAPI ({ commit }, config) {
      let api = axios.create(config)
      const startLoading = (payload) => {
        commit('loading', true)
        return payload
      }
      const stopLoading = (payload) => {
        commit('loading', false)
        return payload
      }
      api.interceptors.request.use(startLoading, stopLoading)
      api.interceptors.response.use(stopLoading, stopLoading)
      commit('api', api)
    },
    setProvider ({ commit, dispatch }, provider) {
      dispatch('clearState')
      commit('provider', provider)
    },
    clearState ({ commit }) {
      commit('repo/project', null)
      commit('repo/projects', [])
    },
    signIn ({ state, getters, commit, dispatch }) {
      const { baseURL, headers } = getters

      dispatch('setAPI', { baseURL, headers })
      state.api.get('/user')
        .then(response => {
          commit('user', response.data)
        })
    },
    signOut ({ getters, commit, dispatch }) {
      const { baseURL } = getters

      commit('user', null)
      dispatch('clearState')
      dispatch('setAPI', { baseURL })
    }
  }
})

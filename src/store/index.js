import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import filter from './modules/filter'
import issue from './modules/issue'
import pagination from './modules/pagination'
import gitlab from './modules/gitlab'
import github from './modules/github'
import env from './modules/env'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    env,
    github,
    gitlab,
    pagination,
    issue,
    filter
  },
  state: {
    // list of suupported providers
    providers: [
      'gitlab',
      'github'
    ],
    hasLocalSotrage: typeof Storage !== 'undefined',
    rememberMe: null,
    error: null,
    user: null,
    api: axios,
    loading: false,
    provider: 'null'
  },
  mutations: {
    rememberMe: function (state, value) {
      state.rememberMe = value
    },
    error: function (state, value) {
      state.error = value
    },
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
      state[state.provider].url = value
    },
    providerToken: function (state, value) {
      state[state.provider].token = value
    }
  },
  getters: {
    providerURL (state) {
      return state[state.provider]
        ? state[state.provider].url
        : null
    },
    providerToken (state) {
      return state[state.provider]
        ? state[state.provider].token
        : null
    },
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

      // set loading status in interxeptors
      const onRequest = (config) => {
        commit('error', null)
        commit('loading', true)
        return config
      }
      const onRequestError = (error) => {
        commit('loading', false)
        commit('error', error)
        return Promise.reject(error)
      }
      const onResponse = (response) => {
        commit('loading', false)
        return response
      }
      const onResponseError = (error) => {
        commit('loading', false)
        commit('error', error.response.data.message)
        return Promise.reject(error)
      }

      api.interceptors.request.use(onRequest, onRequestError)
      api.interceptors.response.use(onResponse, onResponseError)
      commit('api', api)
    },
    setProvider ({ commit, dispatch }, provider) {
      dispatch('clearState')
      commit('provider', provider)
    },
    clearState ({ commit }) {
      commit('filter/project', null)
      commit('filter/projects', [])
      commit('issue/issues')
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

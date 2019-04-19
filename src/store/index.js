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
    hasLocalStorage: typeof Storage !== 'undefined',
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
    initAPI ({ dispatch, getters }) {
      const { baseURL } = getters

      dispatch('setAPI', { baseURL })
    },
    authenticateAPI ({ dispatch, getters }) {
      const { baseURL, headers } = getters

      dispatch('setAPI', { baseURL, headers })
    },
    setProvider ({ commit, dispatch }, provider) {
      dispatch('clearState')
      commit('provider', provider)
      dispatch('initAPI')
    },
    initProvider ({ state, commit, dispatch, getters }) {
      const { hasLocalStorage } = state

      if (hasLocalStorage) {
        const rememberMe = Boolean(window.localStorage.getItem('rememberMe') || false)

        commit('rememberMe', rememberMe)

        if (rememberMe) {
          commit('provider', window.localStorage.getItem('provider'))
          commit('providerURL', window.localStorage.getItem('url'))
          commit('providerToken', window.localStorage.getItem('token'))
          dispatch('signIn')
        } else {
          dispatch('setProvider', 'gitlab')
        }
      } else {
        dispatch('setProvider', 'gitlab')
      }
    },
    clearState ({ commit }) {
      commit('filter/project', null)
      commit('filter/projects', [])
      commit('issue/issues')
    },
    setLocalSignInData ({ state, getters }) {
      const { provider, hasLocalStorage, rememberMe } = state
      const { providerURL, providerToken } = getters

      if (hasLocalStorage) {
        if (rememberMe) {
          window.localStorage.provider = provider
          window.localStorage.url = providerURL
          window.localStorage.token = providerToken
          window.localStorage.rememberMe = rememberMe
        } else {
          window.localStorage.removeItem('provider')
          window.localStorage.removeItem('url')
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('rememberMe')
        }
      }
    },
    signIn ({ state, commit, dispatch }) {
      dispatch('authenticateAPI')
      state.api.get('/user')
        .then(response => {
          dispatch('setLocalSignInData')
          commit('user', response.data)
        })
    },
    signOut ({ commit, dispatch }) {
      commit('user', null)
      commit('rememberMe', false)
      dispatch('setLocalSignInData')
      dispatch('clearState')
      dispatch('initAPI')
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // projects
    projects: [],
    project: null,
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
    projects: function (state, value) {
      state.projects = value
    },
    project: function (state, value) {
      state.project = value
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
      state.providerURL = value
    },
    providerToken: function (state, value) {
      state.providerToken = value
    }
  },
  getters: {
    label (state) {
      switch (state.provider) {
        case 'gitlab':
          return 'path_with_namespace'
        case 'github':
          return 'full_name'
        default:
          return null
      }
    },
    getProjectsParams: (state) => (search) => {
      // set pagination for projects
      const params = {
        'per_page': '10'
      }
      switch (state.provider) {
        case 'gitlab':
          return { ...params, search }
        case 'github':
          const q = search
          return { ...params, q }
        default:
          return null
      }
    },
    getResponseItems: (state) => (data) => {
      switch (state.provider) {
        case 'gitlab':
          return data
        case 'github':
          return data.items
        default:
          return null
      }
    },
    getProjectsURL (state) {
      switch (state.provider) {
        case 'gitlab':
          return '/projects'
        case 'github':
          return '/search/repositories'
        default:
          return null
      }
    },
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
    refreshProjects ({ state, getters, dispatch }, search) {
      // deconstruct geters
      const {
        getProjectsURL,
        getProjectsParams,
        getResponseItems
      } = getters

      // set params
      const url = getProjectsURL
      const params = getProjectsParams(search)

      // get the list of projects
      state.api.get(url, { params })
        .then(response => {
          dispatch('setProjects', getResponseItems(response.data))
        })
    },
    setProjects ({ commit }, projects) {
      commit('projects', projects)
    },
    setProject ({ commit }, project) {
      commit('project', project)
    },
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
    setProvider ({ commit }, provider) {
      commit('provider', provider)
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
      dispatch('setAPI', { baseURL })
    }
  }
})

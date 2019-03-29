
const state = {
  url: process.env.VUE_APP_GITHUB_URL || 'https://github.com',
  token: process.env.VUE_APP_GITHUB_TOKEN
}

const mutations = {
}

const getters = {
  projectFullName (state, getters, rootState) {
    const project = rootState.filter.project
    return project
      ? project.full_name
      : null
  },
  projectLabel () {
    return 'full_name'
  },
  getProjectParams: () => (search) => {
    return {
      per_page: 10,
      q: search
    }
  },
  getProjectURL: (state, getters, rootState) => () => {
    return '/search/repositories'
  },
  getIssuesParams: (state, getters, rootState) => () => {
    const search = rootState.filter.search
    return {
      per_page: rootState.pagination.perPageItems,
      q: search
    }
  },
  issuesURL (state, getters, rootState) {
    return '/search/issues'
  },
  getResponseItems: (statestate, getters, rootState) => (data) => {
    return data.items
  },
  baseURL (state, getters, rootState) {
    const { url } = state
    return url === 'https://github.com'
      ? 'https://api.github.com/'
      : `${url}/api/v3`
  },
  headers (state, getters, rootState) {
    return state.token
      ? { 'Authorization': `token ${state.token}` }
      : null
  }
}

const actions = {
  setPaginationStats ({ rootState, commit }, response) {
    const links = rootState.pagination.links
    const url = response.request.responseURL

    const p = url.match(/[&|?]page=(\d+)/)
    const page = p ? p[1] : '1'
    commit('pagination/page', page, { root: true })

    const tp = links['last']
      ? links['last'].match(/[&|?]page=(\d+)/)
      : null
    const totalPages = tp
      ? tp[1]
      : page
    commit('pagination/totalPages', totalPages, { root: true })

    const pp = url.match(/[&|?]per_page=(\d+)/)
    const perPage = pp ? pp[1] : '1'
    commit('pagination/perPageItems', perPage, { root: true })

    commit('pagination/totalItems', response.data.total_count, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

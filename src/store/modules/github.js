
const state = {
}

const mutations = {
}

const getters = {
  projectFullName (state, getters, rootState) {
    const project = rootState.repo.project
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
  projectURL (state, getters, rootState) {
    return '/search/repositories'
  },
  getIssuesParams: (state, getters) => (search) => {
    const { projectFullName } = getters
    return {
      per_page: 20,
      q: `state:open type:issue repo:${projectFullName}`
    }
  },
  issuesURL (state, getters, rootState) {
    return '/search/issues'
  },
  getResponseItems: (statestate, getters, rootState) => (data) => {
    return data.items
  },
  baseURL (statestate, getters, rootState) {
    return 'https://api.github.com/'
  },
  headers (statestate, getters, rootState) {
    return rootState.providerToken
      ? { 'Authorization': `token ${rootState.providerToken}` }
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

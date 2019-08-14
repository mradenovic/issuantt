
const state = {
  // pagination
  page: null,
  totalPages: null,
  perPageItems: 20,
  totalItems: null,
  links: {}
}

const mutations = {
  page: function (state, value) {
    state.page = value
  },
  totalPages: function (state, value) {
    state.totalPages = value
  },
  perPageItems: function (state, value) {
    state.perPageItems = value
  },
  totalItems: function (state, value) {
    state.totalItems = value
  },
  links: function (state, value) {
    state.links = value
  }
}

export const getters = {
  taskCount (state, getters, rootState) {
    return rootState.issue.issues
      ? rootState.issue.issues.length
      : 0
  },
  firstTaskOrd (state, getters) {
    const { perPageItems, page } = state
    return (page - 1) * perPageItems + 1
  },
  lastTaskOrd (state, getters) {
    const { perPageItems, page } = state
    const { taskCount } = getters
    return (page - 1) * perPageItems + taskCount
  }
}

export const actions = {
  setAll ({ dispatch }, response) {
    dispatch('setLinks', response.headers['link'])
    dispatch('setStats', response)
  },
  setStats ({ rootState, dispatch }, response) {
    dispatch(`${rootState.provider}/setPaginationStats`, response, { root: true })
  },
  setLinks ({ commit }, header) {
    // console.log('setLinks: header', header)
    let re = /<(\S*)>;[\s]*rel="([a-z]+)"/g
    let arrRes = []
    let links = {}

    while ((arrRes = re.exec(header)) !== null) {
      links[arrRes[2]] = arrRes[1]
    }

    // remove redundant links
    if (!links.prev) {
      delete links.first
    }
    if (!links.next) {
      delete links.last
    }
    commit('links', links)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


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

const getters = {
}

const actions = {
  setAll ({ dispatch }, response) {
    dispatch('setLinks', response.headers['link'])
    dispatch('setStats', response)
  },
  setStats ({ rootState, dispatch }, response) {
    switch (rootState.provider) {
      case 'gitlab':
        dispatch('setGitLabStats', response.headers)
        break
      case 'github':
        dispatch('setGitHubStats', response)
        break
      default:
        break
    }
  },
  setGitLabStats ({ commit }, headers) {
    commit('page', headers['x-page'].match(/\d+/)[0])
    commit('totalPages', headers['x-total-pages'].match(/\d+/)[0])
    commit('perPageItems', headers['x-per-page'].match(/\d+/)[0])
    commit('totalItems', headers['x-total'].match(/\d+/)[0])
  },
  setGitHubStats ({ commit, state }, response) {
    const links = state.links
    const url = response.request.responseURL

    const p = url.match(/[&|?]page=(\d+)/)
    const page = p ? p[1] : '1'
    commit('page', page)

    const tp = links['last']
      ? links['last'].match(/[&|?]page=(\d+)/)
      : null
    const totalPages = tp
      ? tp[1]
      : page
    commit('totalPages', totalPages)

    const pp = url.match(/[&|?]per_page=(\d+)/)
    const perPage = pp ? pp[1] : '1'
    commit('perPageItems', perPage)
    commit('totalItems', response.data.total_count)
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

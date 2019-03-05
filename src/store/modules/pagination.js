
const state = {
  // pagination
  page: null,
  totaPages: null,
  itemsPerPage: 20,
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
  itemsPerPage: function (state, value) {
    state.itemsPerPage = value
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

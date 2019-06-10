
const state = {
  search: '',
  // projects
  projects: [],
  project: null
}

const mutations = {
  search: function (state, value) {
    state.search = value
  },
  projects: function (state, value) {
    state.projects = value
  },
  project: function (state, value) {
    state.project = value
  }
}

export const getters = {
  fullName (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/projectFullName`]
  },
  label (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/projectLabel`]
  },
  getParams: (state, getters, rootState, rootGetters) => (search) => {
    return rootGetters[`${rootState.provider}/getProjectParams`](search)
  },
  getURL: (state, getters, rootState, rootGetters) => (search) => {
    return rootGetters[`${rootState.provider}/getProjectURL`](search)
  }
}

export const actions = {
  refreshProjects ({ state, rootState, getters, rootGetters, commit }, search) {
    // deconstruct geters
    const { getResponseItems } = rootGetters
    const { getURL, getParams } = getters

    // get the list of projects
    rootState.api.get(getURL(search), { params: getParams(search) })
      .then(response => {
        const data = getResponseItems(response.data)
        commit('projects', data)
      })
  },
  setProjects ({ commit }, projects) {
    commit('projects', projects)
  },
  setProject ({ commit }, project) {
    commit('project', project)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

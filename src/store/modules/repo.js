
const state = {
  // projects
  projects: [],
  project: null
}

const mutations = {
  projects: function (state, value) {
    state.projects = value
  },
  project: function (state, value) {
    state.project = value
  }
}

const getters = {
  fullName (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/projectFullName`]
  },
  label (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/projectLabel`]
  },
  getParams: (state, getters, rootState, rootGetters) => (search) => {
    return rootGetters[`${rootState.provider}/getProjectParams`](search)
  },
  url (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/projectURL`]
  }
}

const actions = {
  refreshProjects ({ state, rootState, getters, rootGetters, dispatch }, search) {
    // deconstruct geters
    const { getResponseItems } = rootGetters
    const { url, getParams } = getters

    // get the list of projects
    rootState.api.get(url, { params: getParams(search) })
      .then(response => {
        const data = getResponseItems(response.data)
        dispatch('setProjects', data)
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

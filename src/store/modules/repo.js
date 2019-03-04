
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
  label (state, getters, rootState) {
    switch (rootState.provider) {
      case 'gitlab':
        return 'path_with_namespace'
      case 'github':
        return 'full_name'
      default:
        return null
    }
  },
  getParams: (state, getters, rootState) => (search) => {
    // set pagination for projects
    const params = {
      'per_page': '10'
    }
    switch (rootState.provider) {
      case 'gitlab':
        return { ...params, search }
      case 'github':
        const q = search
        return { ...params, q }
      default:
        return null
    }
  },
  url (state, getters, rootState) {
    switch (rootState.provider) {
      case 'gitlab':
        return '/projects'
      case 'github':
        return '/search/repositories'
      default:
        return null
    }
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

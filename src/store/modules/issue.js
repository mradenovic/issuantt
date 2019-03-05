
const state = {
  // issues
  issues: []
}

const mutations = {
  issues: function (state, value) {
    state.issues = value
  },
  project: function (state, value) {
    state.project = value
  }
}

const getters = {
  params (state, getters, rootState, rootGetters) {
    // set pagination for issues
    const params = {
      'per_page': '20'
    }
    const fullName = rootGetters['repo/fullName']

    switch (rootState.provider) {
      case 'gitlab':
        const state = 'opened'
        return { ...params, state }
      case 'github':
        const q = `state:open type:issue repo:${fullName}`
        return { ...params, q }
      default:
        return null
    }
  },
  url (state, getters, rootState) {
    const project = rootState.repo.project
    if (!project) {
      return null
    }

    switch (rootState.provider) {
      case 'gitlab':
        return `/projects/${project.id}/issues`
      case 'github':
        return '/search/issues'
      default:
        return null
    }
  }
}

const actions = {
  refreshIssues ({ state, rootState, getters, rootGetters, dispatch }, link) {
    // deconstruct geters
    const { url, params } = link
      // pagination link
      ? { url: link, params: {} }
      // state params
      : getters
    const { getResponseItems } = rootGetters

    // get the list of issues
    rootState.api.get(url, { params })
      .then(response => {
        const data = getResponseItems(response.data)
        dispatch('pagination/setAll', response, { root: true })
        dispatch('setIssues', data)
      })
  },
  setIssues ({ commit }, issues) {
    commit('issues', issues)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

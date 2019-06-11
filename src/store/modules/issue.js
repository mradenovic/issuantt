
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

export const getters = {
  params (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/getIssuesParams`]('')
  },
  url (state, getters, rootState, rootGetters) {
    return rootGetters[`${rootState.provider}/issuesURL`]
  }
}

export const actions = {
  refreshIssues ({ state, rootState, getters, rootGetters, dispatch, commit }, link) {
    // deconstruct geters
    const { url, params } = link
      // pagination link
      ? { url: link, params: {} }
      // state params
      : getters
    const { getResponseItems } = rootGetters

    // clear issues before fetching the new ones
    commit('issues', [])

    // get the list of issues
    rootState.api.get(url, { params })
      .then(response => {
        const data = getResponseItems(response.data)
        dispatch('pagination/setAll', response, { root: true })
        commit('issues', data)
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


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
  refreshIssues ({ state, rootState, getters, rootGetters, dispatch }) {
    // deconstruct geters
    const { getResponseItems } = rootGetters
    const { url, params } = getters

    // get the list of issues
    rootState.api.get(url, { params })
      .then(response => {
        const data = getResponseItems(response.data)
        dispatch('setIssues', data)
      })
  },
  setIssues ({ commit }, issues) {
    commit('issues', issues)
  },
  getLinks (linkHeader) {
    let re = /<(\S*)>;[\s]*rel="([a-z]+)"/g
    let arrRes = []
    let links = {}

    while ((arrRes = re.exec(linkHeader)) !== null) {
      links[arrRes[2]] = arrRes[1]
    }

    // remove redundant links
    if (!links.prev) {
      delete links.first
    }
    if (!links.next) {
      delete links.last
    }
    return links
  },
  getIssues (issuesUrl) {
    if (!issuesUrl) return

    this.api.get(issuesUrl)
      .then(response => {
        this.linkHeader = response.headers['link']
        this.links = this.getLinks(this.linkHeader)
        this.issues = response.data
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

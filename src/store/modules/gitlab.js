
const state = {
  url: process.env.VUE_APP_GITLAB_URL || 'https://gitlab.com',
  token: process.env.VUE_APP_GITLAB_TOKEN
}

const mutations = {
}

export const getters = {
  projectFullName (state, getters, rootState) {
    const project = rootState.filter.project
    return project
      ? project.path_with_namespace
      : null
  },
  projectLabel () {
    return 'path_with_namespace'
  },
  getProjectParams: () => (search) => {
    // check if search has form of 'group/[subgroup/]project
    // and return only the project name
    const project = search && search.split('/').pop()
    return {
      per_page: 10,
      search: project
    }
  },
  getProjectURL: () => (search) => {
    // check if search has form of 'group/[subgroup/]project
    // and return proper url
    let gp = search && search.split('/')
    gp.pop()
    const group = encodeURIComponent(gp.join('/'))
    return gp && gp.length === 0
      ? 'projects'
      : `groups/${group}/projects`
  },
  search (state, getters, rootState) {
    let match
    let search = {}
    // regexp (key):(("value")|(value))
    const re = new RegExp('(\\S+?):(?:"(.+?)"\\s*|(\\S+))', 'g')

    while ((match = re.exec(rootState.route.query.q))) {
      search[match[1]] = match[2] || match[3]
    }

    return search
  },
  group (state, getters) {
    return getters.search.group
  },
  project (state, getters) {
    return getters.search.project
  },
  getIssuesParams: (state, getters, rootState) => (search) => {
    let q = { ...getters.search }
    delete q.user
    delete q.group
    delete q.project

    return {
      per_page: rootState.pagination.perPageItems,
      ...q
    }
  },
  issuesURL (state, getters, rootState) {
    // const project = rootState.filter.project
    const { group, project } = getters
    const groupsURI = group
      ? `/groups/${encodeURIComponent(group)}`
      : ''
    const projectsURI = project
      ? `/projects/${encodeURIComponent(project)}`
      : ''

    return `${groupsURI}${projectsURI}/issues`
  },
  getResponseItems: (statestate, getters, rootState) => (data) => {
    return data
  },
  baseURL (state, getters, rootState) {
    return `${state.url}/api/v4`
  },
  headers (state, getters, rootState) {
    return state.token
      ? { 'PRIVATE-TOKEN': `${state.token}` }
      : null
  }
}

export const actions = {
  setPaginationStats ({ commit }, response) {
    const actions = [
      { header: 'x-page', param: 'page' },
      { header: 'x-total-pages', param: 'totalPages' },
      { header: 'x-per-page', param: 'perPageItems' },
      { header: 'x-total', param: 'totalItems' }
    ]

    for (const action of actions) {
      const header = response.headers[action.header]
      const value = header ? header.match(/\d+/)[0] : 'unknown'
      commit(`pagination/${action.param}`, value, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

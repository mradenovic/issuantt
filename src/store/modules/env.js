const state = {
  gitlabURL: process.env.VUE_APP_GITLAB_URL,
  githubURL: process.env.VUE_APP_GITHUB_URL,

  gitlabToken: process.env.VUE_APP_GITLAB_TOKEN,
  githubToken: process.env.VUE_APP_GITHUB_TOKEN,

  customStartString: process.env.VUE_APP_CUSTOM_START_STRING,
  customDueString: process.env.VUE_APP_CUSTOM_DUE_STRING,
  customDependsOnString: process.env.VUE_APP_CUSTOM_DEPENDS_ON_STRING,
  customParentIdString: process.env.VUE_APP_CUSTOM_PARENT_ID_STRING
}

const getters = {
  customStrings (state) {
    const {
      customStartString,
      customDueString,
      customDependsOnString,
      customParentIdString
    } = state

    // return values only if defined
    return {
      ...(customStartString && { customStartString }),
      ...(customDueString && { customDueString }),
      ...(customDependsOnString && { customDependsOnString }),
      ...(customParentIdString && { customParentIdString })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters
}

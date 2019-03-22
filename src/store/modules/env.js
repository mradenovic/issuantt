const state = {
  startString: process.env.VUE_APP_CUSTOM_START_STRING,
  dueString: process.env.VUE_APP_CUSTOM_DUE_STRING,
  dependsOnString: process.env.VUE_APP_CUSTOM_DEPENDS_ON_STRING,
  parentIdString: process.env.VUE_APP_CUSTOM_PARENT_ID_STRING
}

const getters = {
  customStrings (state) {
    const {
      startString,
      dueString,
      dependsOnString,
      parentIdString
    } = state

    // return values only if defined
    return {
      ...(startString && { startString }),
      ...(dueString && { dueString }),
      ...(dependsOnString && { dependsOnString }),
      ...(parentIdString && { parentIdString })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters
}

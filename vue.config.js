const isProduction = process.env.NODE_ENV === 'production'

// get project name from GitLab CI environment
const CI_PROJECT_NAME = process.env.CI_PROJECT_NAME

// get project name from GitLab CI environment
const CI_PROJECT_NAMESPACE = process.env.CI_PROJECT_NAMESPACE

const re = new RegExp(`${CI_PROJECT_NAMESPACE}.gitlab.io`)

// if project path has form of namespace/namespace.gitlab.io
// GitLab Pges will be served under namespace.gitlab.io domain
//
// if project path has form of namespace/project-name
// GitLab Pges will be served under namespace.gitlab.io/project-name domain
const publicPath = CI_PROJECT_NAME && CI_PROJECT_NAME.match(re)
  ? '/'
  : CI_PROJECT_NAME

module.exports = {
  devServer: {
      disableHostCheck: true
  },
  publicPath: isProduction && publicPath
    ? publicPath
    : '/'
}

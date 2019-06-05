import { getters } from '@/store/modules/gitlab'
import { actions } from '@/store/modules/gitlab'

describe('store.gitlab.getters', () => {
  const params = {
    per_page: 10,
    search: 'issuantt'
  }

  describe('projectFullName()', () => {
    it('should return project.path_with_namespace" if state.filter.project is defined', () => {
      const rootState = { 
        filter: {
          project: {
            path_with_namespace: 'issuantt/issuantt'
          }
        }
      }
      expect(getters.projectFullName(null, null, rootState)).toEqual('issuantt/issuantt')
    })

    it('should return null if state.filter.project is not definde', () => {
      const rootState = { filter: {} }
      expect(getters.projectFullName(null, null, rootState)).toBeNull()
    })
  })

  describe('projectLabel()', () => {
    it('should return string "path_with_namespace"', () => {
      expect(getters.projectLabel()).toEqual('path_with_namespace')
    })
  })

  describe('getProjectParams(search)', () => {
    it('should return params for "group/[subgroup/]projectName"', () => {
      expect(getters.getProjectParams()('issuantt/issuantt')).toEqual(params)
    })

    it('should return params for "projectName"', () => {
      expect(getters.getProjectParams()('issuantt')).toEqual(params)
    })
  })

  describe('getProjectURL(search)', () => {
    it('should return group projects URL for "group/[subgroup/]projectName"', () => {
      expect(getters.getProjectURL()('issuantt/issuantt')).toEqual('groups/issuantt/projects')
    })

    it('should return projects URL for "projectName"', () => {
      expect(getters.getProjectURL()('issuantt')).toEqual('projects')
    })
  })

  describe('search()', () => {
    const rootState = {
      filter: {
        search: 'group:issuantt project:issuantt/issuantt labels:"bug: critical" user:username milestone:"1.0 Release"'
      }
    }

    it('should return a search object from state.filter.search string', () => {
      const search = {
        group: 'issuantt',
        project: 'issuantt/issuantt',
        user: 'username',
        labels: 'bug: critical',
        milestone: '1.0 Release'
      }
      expect(getters.search(null, null, rootState)).toEqual(search)
    })
  })

  describe('group()', () => {
    const localGetters = {
      search: {
        group: 'issuantt'
      }
    }

    it('should return a group name', () => {
      expect(getters.group(null, localGetters)).toBe('issuantt')
    })
  })

  describe('project()', () => {
    const localGetters = {
      search: {
        project: 'issuantt/issuantt'
      }
    }

    it('should return a project name', () => {
      expect(getters.project(null, localGetters)).toBe('issuantt/issuantt')
    })
  })

  describe('getIssuesParams()', () => {
    const localGetters = {
      search: {
        group: 'issuantt',
        project: 'issuantt/issuantt',
        user: 'username',
        labels: 'bug: critical',
        milestone: '1.0 Release'
      }
    }
    const rootState = {
      pagination: {
        perPageItems: 10
      }
    }
    const search = {
      per_page: 10,
      labels: 'bug: critical',
      milestone: '1.0 Release'
    }

    it('should return params object for GitLab issues', () => {
      expect(getters.getIssuesParams(null, localGetters, rootState)()).toEqual(search)
    })
  })

  describe('issuesURL()', () => {
    it('should return encoded project issues URL when project is defined', () => {
      const localGetters = {
        project: 'issuantt/issuantt'
      }

      expect(getters.issuesURL(null, localGetters)).toBe('/projects/issuantt%2Fissuantt/issues')
    })

    it('should return encoded group issues URL when group is defined', () => {
      const localGetters = {
        group: 'issuantt/issuantt'
      }

      expect(getters.issuesURL(null, localGetters)).toBe('/groups/issuantt%2Fissuantt/issues')
    })
  })

  describe('getResponseItems(data)', () => {
    it('should return unchanged data object', () => {
      expect(getters.getResponseItems()({ a: 'unchanged' })).toEqual({ a: 'unchanged' })
    })
  })

  describe('baseURL()', () => {
    it('should return base URL', () => {
      const state = {
        url: 'https:/example.com'
      }
      expect(getters.baseURL(state)).toBe('https:/example.com/api/v4')
    })
  })

  describe('headers()', () => {
    it('should return request headers object with PRIVATE-TOKEN set', () => {
      const state = {
        token: 'some-token'
      }
      expect(getters.headers(state)).toEqual({ 'PRIVATE-TOKEN': 'some-token' })
    })

    it('should return null if there is no token', () => {
      const state = {}
      expect(getters.headers(state)).toBeNull()
    })
  })
})

describe('store.gitlab.actions', () => {
  describe('setPaginationStats(context, response)', () => {
    const mockCommit = jest.fn((action, value) => {})
    const headers = {
      'x-total': '21',
      'x-per-page': '20',
      // 'x-total-pages': '2',
      'x-page': '1'
    }

    actions.setPaginationStats({ commit: mockCommit }, { headers })

    it('should call commit 4 times', () => {
      expect(mockCommit.mock.calls.length).toBe(4)
    })

    it('should commit proper value if header exists', () => {
      expect(mockCommit).toBeCalledWith('pagination/page', '1', { root: true })
      expect(mockCommit).toBeCalledWith('pagination/perPageItems', '20', { root: true })
      expect(mockCommit).toBeCalledWith('pagination/totalItems', '21', { root: true })
    })

    it('should commit "unknown" value if header does not exist', () => {
      expect(mockCommit).toBeCalledWith('pagination/totalPages', 'unknown', { root: true })
    })
  })
})

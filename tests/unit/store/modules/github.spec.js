import { getters, actions } from '@/store/modules/github'

describe('store.github.getters', () => {
  const params = {
    per_page: 10,
    q: 'issuantt'
  }

  describe('projectFullName()', () => {
    it('should return project.full_anme" if state.filter.project is defined', () => {
      const rootState = {
        filter: {
          project: {
            full_name: 'issuantt/issuantt'
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
    it('should return string "full_name"', () => {
      expect(getters.projectLabel()).toEqual('full_name')
    })
  })

  describe('getProjectParams(search)', () => {
    it('should return params for "projectName"', () => {
      expect(getters.getProjectParams()('issuantt')).toEqual(params)
    })
  })

  describe('getProjectURL(search)', () => {
    it('should return string "/search/repositories"', () => {
      expect(getters.getProjectURL()()).toEqual('/search/repositories')
    })
  })

  describe('getIssuesParams()', () => {
    const perPageItems = 10
    const search = 'repo:issuantt/issuantt state:open'
    const rootState = {
      filter: {
        search: search
      },
      pagination: {
        perPageItems: perPageItems
      }
    }
    const params = {
      per_page: perPageItems,
      q: search
    }

    it('should return params object for GitHub issues', () => {
      expect(getters.getIssuesParams(null, null, rootState)()).toEqual(params)
    })
  })

  describe('issuesURL()', () => {
    it('should return string /search/issues"', () => {
      expect(getters.issuesURL()).toBe('/search/issues')
    })
  })

  describe('getResponseItems(data)', () => {
    const items = [0, 1, 2]
    const data = { items: items }

    it('should return data.items', () => {
      expect(getters.getResponseItems()(data)).toEqual(items)
    })
  })

  describe('baseURL()', () => {
    it('should return base URL for https://github.com', () => {
      const state = {
        url: 'https://github.com'
      }

      expect(getters.baseURL(state)).toBe('https://api.github.com/')
    })

    it('should return base URL for custom instances i.e. https://example.com', () => {
      const state = {
        url: 'https://example.com'
      }

      expect(getters.baseURL(state)).toBe('https://example.com/api/v3')
    })
  })

  describe('headers()', () => {
    it('should return request headers object with Authorization set', () => {
      const state = {
        token: 'some-token'
      }
      expect(getters.headers(state)).toEqual({ 'Authorization': 'token some-token' })
    })

    it('should return null if there is no token', () => {
      const state = {}
      expect(getters.headers(state)).toBeNull()
    })
  })
})

describe('store.github.actions', () => {
  describe('setPaginationStats(context, response)', () => {
    const mockCommit = jest.fn((action, value) => {})
    const links = {
      'last': 'https://api.github.com/search/issues?per_page=20&q=repo%3Aissuantt%2Fissuantt&page=2'
    }
    const url = 'https://api.github.com/search/issues?per_page=20&q=repo:issuantt%2Fissuantt'
    const totalItems = '21'

    const rootState = {
      pagination: {
        links: links
      }
    }
    const response = {
      request: {
        responseURL: url
      },
      data: {
        total_count: totalItems
      }
    }

    actions.setPaginationStats({ rootState: rootState, commit: mockCommit }, response)

    it('should call commit 4 times', () => {
      expect(mockCommit.mock.calls.length).toBe(4)
    })

    it('should commit proper stats values', () => {
      expect(mockCommit).toBeCalledWith('pagination/page', '1', { root: true })
      expect(mockCommit).toBeCalledWith('pagination/perPageItems', '20', { root: true })
      expect(mockCommit).toBeCalledWith('pagination/totalItems', '21', { root: true })
      expect(mockCommit).toBeCalledWith('pagination/totalPages', '2', { root: true })
    })
  })
})

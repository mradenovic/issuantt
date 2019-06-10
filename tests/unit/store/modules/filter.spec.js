import { getters, actions } from '@/store/modules/filter'

describe('store.filter.getters', () => {
  const params = {
    per_page: 10,
    search: 'issuantt'
  }

  const mockRootState = {
    provider: 'gitlab'
  }

  const mockRootGetters = {
    'gitlab/projectFullName': 'issuantt/issuantt',
    'gitlab/projectLabel': 'path_with_namespace',
    'gitlab/getProjectParams': jest.fn(search => params),
    'gitlab/getProjectURL': jest.fn(search => 'projects')
  }

  describe('fullName()', () => {
    it('should return project full name', () => {
      expect(getters.fullName(null, null, mockRootState, mockRootGetters)).toBe('issuantt/issuantt')
    })
  })

  describe('label()', () => {
    it('should return project label', () => {
      expect(getters.label(null, null, mockRootState, mockRootGetters)).toBe('path_with_namespace')
    })
  })

  describe('getParams()', () => {
    it('should return project params', () => {
      expect(getters.getParams(null, null, mockRootState, mockRootGetters)()).toEqual(params)
    })
  })

  describe('getURL()', () => {
    it('should return project URL', () => {
      expect(getters.getURL(null, null, mockRootState, mockRootGetters)()).toBe('projects')
    })
  })
})

describe('store.filter.actions', () => {
  describe('refreshProjects(context, search)', () => {
    const search = 'issuantt/issuantt'

    const mockData = [
      {
        id: 1,
        name: 'Project name'
      }
    ]

    const mockCommit = jest.fn((action, value) => {})

    const mockRootState = {
      api: {
        get: jest.fn().mockResolvedValue({ data: mockData })
      }
    }

    const mockGetters = {
      getURL: jest.fn(),
      getParams: jest.fn()
    }

    const mockRootGetters = {
      getResponseItems: jest.fn(data => data)
    }

    const mockContext = {
      rootState: mockRootState,
      getters: mockGetters,
      rootGetters: mockRootGetters,
      commit: mockCommit
    }

    actions.refreshProjects({ ...mockContext }, search)

    it('should call rootState.api.get()', () => {
      expect(mockRootState.api.get).toBeCalled()
    })

    it('should call getters.getURL()', () => {
      expect(mockGetters.getURL).toBeCalled()
    })

    it('should call getters.getParams()', () => {
      expect(mockGetters.getParams).toBeCalled()
    })

    it('should call rootGetters.getResponseItems()', () => {
      expect(mockRootGetters.getResponseItems).toBeCalledWith(mockData)
    })

    it('should commit data to projects', () => {
      expect(mockCommit).toBeCalledWith('projects', mockData)
    })
  })
})

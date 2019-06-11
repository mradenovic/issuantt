import { getters, actions } from '@/store/modules/issue'

const mockURL = 'https://gitlab.com/api/v4/projects/issuantt%2Fissuantt/issues'
const mockParams = {
  per_page: 10,
  project: 'issuantt/issuantt'
}
const mockLink = 'https://gitlab.com/api/v4/projects/issuantt%2Fissuantt/issues?id=issuantt%2Fissuantt&order_by=created_at&page=2&per_page=20&sort=desc&state=all&with_labels_details=false'

const mockCommit = jest.fn((action, value) => {})
const mockDispatch = jest.fn((action, value) => {})

const mockData = [
  {
    id: 1,
    title: 'Issue 1'
  }
]

const mockRootState = {
  provider: 'gitlab',
  api: {
    get: jest.fn().mockResolvedValue({ data: mockData })
  }
}

const mockRootGetters = {
  getResponseItems: jest.fn(data => data),
  'gitlab/getIssuesParams': jest.fn(() => mockParams),
  'gitlab/issuesURL': mockURL
}

const mockGetters = {
  url: mockURL,
  params: mockParams
}

const mockContext = {
  rootState: mockRootState,
  getters: mockGetters,
  rootGetters: mockRootGetters,
  commit: mockCommit,
  dispatch: mockDispatch
}

describe('store.issue.getters', () => {
  describe('params()', () => {
    it('should return issues params', () => {
      expect(getters.params(null, null, mockRootState, mockRootGetters)).toEqual(mockParams)
    })
  })

  describe('url()', () => {
    it('should return issues url', () => {
      expect(getters.url(null, null, mockRootState, mockRootGetters)).toEqual(mockURL)
    })
  })
})

describe('store.issue.actions', () => {
  describe('refreshIssues(context, link)', () => {
    describe('when called with link defined', () => {
      actions.refreshIssues({ ...mockContext }, mockLink)

      it('should clear issues before fetching the new ones', () => {
        expect(mockCommit).toBeCalledWith('issues', [])
      })

      it('should call rootState.api.get() with link parameter', () => {
        expect(mockRootState.api.get).toBeCalledWith(mockLink, { params: {} })
      })

      it('should call rootGetters.getResponseItems()', () => {
        expect(mockRootGetters.getResponseItems).toBeCalledWith(mockData)
      })

      it('should dispatch "pagination/setAll"', () => {
        expect(mockDispatch).toBeCalledWith('pagination/setAll', { data: mockData }, { root: true })
      })

      it('should commit new issues', () => {
        expect(mockCommit).toBeCalledWith('issues', mockData)
      })
    })

    describe('when called with link undefined', () => {
      actions.refreshIssues({ ...mockContext }, null)

      it('should clear issues before fetching the new ones', () => {
        expect(mockCommit).toBeCalledWith('issues', [])
      })

      it('should call rootState.api.get() with url and params getters', () => {
        expect(mockRootState.api.get).toBeCalledWith(mockURL, { params: mockParams })
      })

      it('should call rootGetters.getResponseItems()', () => {
        expect(mockRootGetters.getResponseItems).toBeCalledWith(mockData)
      })

      it('should dispatch "pagination/setAll"', () => {
        expect(mockDispatch).toBeCalledWith('pagination/setAll', { data: mockData }, { root: true })
      })

      it('should commit new issues', () => {
        expect(mockCommit).toBeCalledWith('issues', mockData)
      })
    })
  })
})

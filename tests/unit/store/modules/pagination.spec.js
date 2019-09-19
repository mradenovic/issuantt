import { getters, actions } from '@/store/modules/pagination'

const mockResponse = {
  headers: {
    link: '<next_link>; rel="next", <first_link>; rel="first", <last_link>; rel="last"'
  }
}

const mockCommit = jest.fn((action, value) => {})
const mockDispatch = jest.fn((action, value) => {})

const mockData = [
  {
    id: 1,
    title: 'Issue 1'
  }
]

const mockRootState = {
  issue: {
    issues: mockData
  },
  provider: 'gitlab'
}

const mockContext = {
  rootState: mockRootState,
  commit: mockCommit,
  dispatch: mockDispatch
}

describe('store.pagination.getters', () => {
  describe('taskcount()', () => {
    it('should return tasks count', () => {
      expect(getters.taskCount(null, null, mockRootState)).toEqual(1)
    })
  })

  describe('firstTaskOrd()', () => {
    it('should return first task order number', () => {
      expect(getters.firstTaskOrd({ perPageItems: 10, page: 1 }, null)).toEqual(1)
      expect(getters.firstTaskOrd({ perPageItems: 20, page: 3 }, null)).toEqual(41)
    })
  })

  describe('lastTaskOrd()', () => {
    it('should return last task roder number', () => {
      expect(getters.lastTaskOrd({ perPageItems: 10, page: 1 }, { taskCount: 5 })).toEqual(5)
      expect(getters.lastTaskOrd({ perPageItems: 20, page: 3 }, { taskCount: 7 })).toEqual(47)
    })
  })
})

describe('store.pagination.actions', () => {
  describe('setAll(context, response)', () => {
    actions.setAll({ ...mockContext }, mockResponse)

    it('should dispatch "setLinks"', () => {
      expect(mockDispatch).toBeCalledWith('setLinks', mockResponse.headers['link'])
    })

    it('should dispatch "setStats"', () => {
      expect(mockDispatch).toBeCalledWith('setStats', mockResponse)
    })
  })

  describe('setStats(context, response)', () => {
    actions.setStats({ ...mockContext }, mockResponse)

    it('should dispatch "gitlab/setPaginationStats"', () => {
      expect(mockDispatch).toBeCalledWith('gitlab/setPaginationStats', mockResponse, { root: true })
    })
  })

  describe('setLinks(context, header)', () => {
    actions.setLinks({ ...mockContext }, mockResponse.headers.link)

    it('should commit new links', () => {
      expect(mockCommit).toBeCalledWith('links', { last: 'last_link', next: 'next_link' })
    })
  })
})

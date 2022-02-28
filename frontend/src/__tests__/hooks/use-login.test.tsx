import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useLogin } from '@/hooks/auth'

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  )
}
describe('given the right credentials', () => {
  it('should log the user in', async () => {
    expect.hasAssertions()
    const expectation = nock('http://localhost:4000/api/v1')
      .post('/auth/login')
      .reply(201, {
        accessToken: 'secret-token',
      })
    const { result } = renderHook(() => useLogin(), { wrapper })
    await waitFor(() => result.current({ username: 'test', password: 'test' }))
    expect(expectation.isDone()).toBeTruthy()
  })
})

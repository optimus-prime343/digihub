import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Providers } from '@/components/core'
import { server } from '@/mocks/server'

import { LoginForm } from './login-form'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login Form', () => {
  it('should render the login form', () => {
    render(
      <Providers>
        <LoginForm />
      </Providers>
    )
    expect(
      screen.getByRole('heading', { name: /login to your account/i })
    ).toBeInTheDocument()
  })
})
describe('invalid credentials are provided', () => {
  it('should display login failed message', async () => {
    render(
      <Providers>
        <LoginForm />
      </Providers>
    )
    userEvent.type(screen.getByLabelText(/username/i), 'invaliduser')
    userEvent.type(screen.getByLabelText(/password/i), 'invalidpassword')

    userEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getAllByText(/login failed/i)).toHaveLength(2)
    })
  })
})
describe('valid credentials are provided', () => {
  it('should display login success message', async () => {
    render(
      <Providers>
        <LoginForm />
      </Providers>
    )

    userEvent.type(screen.getByLabelText(/username/i), 'validusername')
    userEvent.type(screen.getByLabelText(/password/i), 'validpassword')

    userEvent.click(screen.getByRole('button', { name: /login/i }))
    await waitFor(() => {
      expect(screen.getByText(/successfully logged in/i)).toBeInTheDocument()
    })
  })
})

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Providers } from '@/components/core'
import { server } from '@/mocks/server'

import { UserSignupForm } from './user-signup-form'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
describe('user Signup form', () => {
  it('displays a signupform', () => {
    render(
      <Providers>
        <UserSignupForm />
      </Providers>
    )
    expect(
      screen.getByRole('heading', { name: /create an account/i })
    ).toBeInTheDocument()
  })
  describe('when all the details are filled and signup button is clicked', () => {
    it('displays a signup success notifications', async () => {
      render(
        <Providers>
          <UserSignupForm />
        </Providers>
      )
      userEvent.type(screen.getByLabelText(/first name/i), 'John')
      userEvent.type(screen.getByLabelText(/last name/i), 'Doe')
      userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
      userEvent.type(screen.getByLabelText(/email/i), 'johndoe@gmail.com')
      userEvent.type(screen.getByLabelText('Password'), 'Sachin123@')
      userEvent.type(screen.getByLabelText('Password Confirm'), 'Sachin123@')

      const signupButton = screen.getByRole('button', { name: /signup/i })
      userEvent.click(signupButton)
      await waitFor(() => {
        expect(screen.getByText(/successfully signed up!/i)).toBeInTheDocument()
      })
    })
  })
  describe('when some field are missing and signup button is clicked', () => {
    it('should display the missing field error', async () => {
      render(
        <Providers>
          <UserSignupForm />
        </Providers>
      )
      userEvent.type(screen.getByLabelText(/first name/i), 'John')
      userEvent.type(screen.getByLabelText(/last name/i), 'Doe')
      userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
      userEvent.type(screen.getByLabelText('Password'), 'Sachin123@')
      userEvent.type(screen.getByLabelText('Password Confirm'), 'Sachin123@')

      userEvent.click(screen.getByRole('button', { name: /signup/i }))

      await waitFor(() => {
        expect(
          screen.getByText(/email is a required field/i)
        ).toBeInTheDocument()
      })
    })
  })
})

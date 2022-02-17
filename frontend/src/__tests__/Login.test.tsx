import { render, screen } from '@testing-library/react'

import LoginForm from '~forms/login-form'

describe('loginForm', () => {
  it('should render login form', () => {
    expect.assertions(1)
    render(<LoginForm />)
    expect(screen.getByText(/login to your account/i)).toBeInTheDocument()
  })
})

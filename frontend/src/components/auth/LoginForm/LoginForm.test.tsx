import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Router from 'next/router'

import { LoginForm } from '@/components/auth'

//!TODO FIX TEST NOT WORKING
describe('with valid login credentials', () => {
  it('succesfully logs in user and redirect to homepage', async () => {
    expect.hasAssertions()
    render(<LoginForm />)
    const submitButton = screen.getByRole('button', { name: 'Login' })
    userEvent.click(submitButton)

    expect(Router.pathname).toBe('/')
  })
})

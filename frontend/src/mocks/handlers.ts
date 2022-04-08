import { rest, RestHandler } from 'msw'

import { LoginPayload, SignupPayload } from '@/types/user'

const getApiUrl = (path: string) => `http://localhost:4000/api/v1${path}`

export const handlers: RestHandler[] = [
  rest.post<SignupPayload>(getApiUrl('/auth/signup'), (req, res, ctx) => {
    const { username, password, firstName, lastName, email } = req.body
    if (username && password && firstName && lastName && email) {
      return res(ctx.status(200, 'Successfully signed up!'))
    }
    return res(ctx.status(400, 'Make sure you fill out all fields!'))
  }),
  rest.post<LoginPayload>(getApiUrl('/auth/login'), (req, res, ctx) => {
    const { username, password } = req.body
    if (username === 'validusername' && password === 'validpassword') {
      return res(ctx.status(200, 'Successfully logged in!'))
    }
    return res(ctx.status(400, 'Invalid username or password!'))
  }),
]

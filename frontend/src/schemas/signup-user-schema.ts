import * as Yup from 'yup'

import { PASSWORD_REGEX, PASSWORD_WEAK_MESSAGE } from '@/constants'

export const signupUserSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required().email(),
  username: Yup.string().required().min(4).max(24),
  password: Yup.string()
    .required()
    .matches(PASSWORD_REGEX, { message: PASSWORD_WEAK_MESSAGE }),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
})

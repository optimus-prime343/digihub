import * as Yup from 'yup'

import { PASSWORD_REGEX, PASSWORD_WEAK_MESSAGE } from '~constants/index'

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(PASSWORD_REGEX, { message: PASSWORD_WEAK_MESSAGE }),
  passwordConfirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})

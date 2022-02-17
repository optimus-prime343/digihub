import * as Yup from 'yup'

import {
  PASSWORD_REGEX,
  PASSWORD_WEAK_MESSAGE,
  PHONE_NUMBER_REGEX,
} from '~constants/index'

export const signupMerchantSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().required(),
  password: Yup.string().required().matches(PASSWORD_REGEX, {
    message: PASSWORD_WEAK_MESSAGE,
  }),
  address: Yup.string().required(),
  businessName: Yup.string().required().min(6).max(45),
  businessDescription: Yup.string().required().min(20).max(600),
  phoneNumber: Yup.string().required().matches(PHONE_NUMBER_REGEX, {
    message: 'Please enter a valid phone number',
  }),
})

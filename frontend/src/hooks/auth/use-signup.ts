import { useMutation } from 'react-query'

import { MerchantSignupPayload } from '@/types/merchant'
import { SignupPayload } from '@/types/user'
import { axiosClient } from '@/utils/axiosClient'

export const useSignup = () => {
  return useMutation<Response, unknown, SignupPayload | MerchantSignupPayload>(
    async data => await axiosClient.post('/auth/signup', data)
  )
}

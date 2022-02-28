import { useMutation } from 'react-query'

import { authService } from '@/services/auth-service'
import { MerchantSignupPayload } from '@/types/merchant'
import { SignupPayload } from '@/types/user'

export const useSignup = () => {
  return useMutation<string, unknown, SignupPayload | MerchantSignupPayload>(
    signupPayload => authService.signup(signupPayload)
  )
}

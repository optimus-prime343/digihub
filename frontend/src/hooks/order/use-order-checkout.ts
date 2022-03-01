import { loadStripe } from '@stripe/stripe-js'
import { useCallback } from 'react'

import { axiosClient } from '@/utils/axios-client'

export const useOrderCheckout = () => {
  return useCallback(async (productId: string, quantity: number) => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
      )
      if (!stripe) throw new Error('Stripe is not loaded')
      const { data: session } = await axiosClient.post<{ id: string }>(
        `/orders/checkout-session/${productId}`,
        { quantity }
      )
      if (!session) throw new Error('No session found')
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })
      if (result.error) throw new Error(result.error.message)
    } catch (error: any) {
      console.log(error.message)
      throw new Error(
        error.message ?? error.response?.data?.message ?? 'Something went wrong'
      )
    }
  }, [])
}

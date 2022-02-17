import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useAuth } from '~context/auth'
import { merchantService } from '~services/merchant-service'
import { UpdateMerchantPayload } from '~types/merchant'

import { IMerchantContext, merchantContext } from './merchant-context'

export const MerchantProvider: FC = ({ children }) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const [error, setError] = useState<string | undefined>()

  const updateMerchant = async (
    updateMerchantPayload: UpdateMerchantPayload,
    onUpdate?: () => void
  ) => {
    try {
      const user = await merchantService.updateMerchant(updateMerchantPayload)
      if (user) {
        setUser(user)
        setError(undefined)
        onUpdate?.()
      }
    } catch (error: any) {
      setError(error.response.data?.message ?? 'Failed to update merchant')
    }
  }
  const withdrawAmount = async (amount: number, onSuccess?: () => void) => {
    try {
      const merchant = await merchantService.withdraw(amount)
      setUser(currentUser =>
        currentUser ? { ...currentUser, merchant } : currentUser
      )
      onSuccess?.()
    } catch (error: any) {
      setError(error.response.data?.message ?? 'Failed to withdraw amount')
    }
  }
  const value: IMerchantContext = {
    updateMerchant,
    withdrawAmount,
    error,
  }
  //side effects
  useEffect(() => {
    // remove form errors on route change
    setError(undefined)
  }, [router.pathname])
  return (
    <merchantContext.Provider value={value}>
      {children}
    </merchantContext.Provider>
  )
}

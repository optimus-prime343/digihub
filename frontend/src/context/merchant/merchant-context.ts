import { createContext, useContext } from 'react'

import { UpdateMerchantPayload } from '@/types/merchant'

export interface IMerchantContext {
  updateMerchant: (
    updateMerchantPayload: UpdateMerchantPayload,
    onUpdate?: () => void
  ) => Promise<void>
  withdrawAmount: (amount: number, onSuccess?: () => void) => Promise<void>
  error?: string
}
export const merchantContext = createContext<IMerchantContext>(
  {} as IMerchantContext
)
export const useMerchant = () => useContext(merchantContext)

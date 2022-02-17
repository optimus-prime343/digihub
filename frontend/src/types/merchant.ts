export interface IMerchant {
  id: string
  businessName: string
  businessDescription: string
  address: string
  phoneNumber: string
  status: string
  netIncome: number
  withDrawAmount: number
  pendingAmount: number
}
export type UpdateMerchantPayload = Pick<
  IMerchant,
  'businessName' | 'businessDescription' | 'address'
>

export interface IMerchant {
  id: string
  businessName: string
  businessDescription: string
  address: string
  phoneNumber: string
  status: MerchantStatus
  netIncome: number
  withDrawAmount: number
  pendingAmount: number
  lastWithDrawDate?: string
}
export enum MerchantStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

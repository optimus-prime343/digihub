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
export interface MerchantSignupPayload {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  address: string
  businessDescription: string
  businessName: string
  phoneNumber: string
}
export interface UpdateMerchantPayload {
  businessName: string
  businessDescription: string
  address: string
}
export interface ReportMerchantPayload {
  title: string
  text: string
  reportedBy: string
  reportedBusiness: string
}

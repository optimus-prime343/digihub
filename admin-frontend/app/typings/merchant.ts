import { IUser } from './user'

export interface IMerchant extends IUser {
	merchant: {
		id: string
		businessName: string
		businessDescription: string
		address: string
		phoneNumber: string
		status: string
		netIncome: number
		withDrawAmount: number
		pendingAmount: number
		lastWithDrawDate?: Date
	}
}
export interface UpdateMerchantStatusPayload {
	id: string
	status: string
}

import { IMerchant } from './merchant'

export enum UserRole {
  ADMIN = 'ADMIN',
  MERCHANT = 'MERCHANT',
  USER = 'USER',
}
export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  image: string
  role: UserRole
  verified: boolean
  merchant?: IMerchant
}

export type SignupPayload = Pick<
  IUser,
  'firstName' | 'lastName' | 'email' | 'username'
> & { password: string }

export type LoginPayload = {
  username: string
  password: string
}
export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}
export type UpdateUserPayload = {
  firstName?: string
  lastName?: string
  email?: string
  username?: string
  businessDescription?: string
  address?: string
  businessName?: string
}

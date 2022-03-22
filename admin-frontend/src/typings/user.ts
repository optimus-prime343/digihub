export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MERCHANT = 'MERCHANT',
}
export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  image: string
  role: string
  verified: boolean
}
export interface LoginPayload {
  username: string
  password: string
}
export interface CreateAdminPayload {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

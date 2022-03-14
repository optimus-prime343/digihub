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
	role: UserRole
	verified: boolean
}
export interface ILoginPayload {
	username: string
	password: string
}

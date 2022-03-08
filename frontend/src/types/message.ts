import { IUser } from '@/types/user'

export interface IMessage {
  id: string
  text: string
  createdAt: string
  from: IUser
  to: IUser
}

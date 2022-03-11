import { IUser } from '@/types/user'

export interface IMessage {
  id: string
  text: string
  createdAt: Date
  author: IUser
  receiverId: string
}

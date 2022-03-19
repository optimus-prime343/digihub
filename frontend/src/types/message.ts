import { IUser } from '@/types/user'

export interface IMessage {
  id: string
  content: string
  createdAt: Date
  sender: IUser
  recipient: string
}

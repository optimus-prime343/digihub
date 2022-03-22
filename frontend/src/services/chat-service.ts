import { IContact } from '@/types/contact'
import { IMessage } from '@/types/message'
import { axiosClient } from '@/utils/axios-client'

class ChatService {
  async getContacts(): Promise<IContact[]> {
    try {
      const { data } = await axiosClient.get<IContact[]>('/chat/contacts')
      console.log(data)
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch contacts'
      )
    }
  }
  async getMessages(receiverId: string): Promise<IMessage[]> {
    try {
      const { data } = await axiosClient.get<IMessage[]>(
        `/chat/messages/${receiverId}`
      )
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch messages'
      )
    }
  }
}
export const chatService = new ChatService()

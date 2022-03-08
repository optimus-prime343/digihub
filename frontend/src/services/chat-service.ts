import { IContact } from '@/types/contact'
import { IMessage } from '@/types/message'
import { axiosClient } from '@/utils/axios-client'

class ChatService {
  async getContacts(): Promise<IContact[]> {
    try {
      const { data } = await axiosClient.get<IContact[]>('/chat/contacts')
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch contacts'
      )
    }
  }
  async getMessages(fromId?: string, toId?: string): Promise<IMessage[]> {
    try {
      const { data } = await axiosClient.get<any[]>(`/chat/${fromId}/${toId}`)
      return data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch messages'
      )
    }
  }
}
export const chatService = new ChatService()

import { useQuery } from 'react-query'

import { chatService } from '@/services/chat-service'
import { IContact } from '@/types/contact'

export const useContacts = () => {
  return useQuery<IContact[]>('contacts', () => chatService.getContacts())
}

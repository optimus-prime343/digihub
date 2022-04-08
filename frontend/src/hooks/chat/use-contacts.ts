import { useQuery } from 'react-query'

import { chatService } from '@/services/chat-service'

export const useContacts = () => {
  const result = useQuery('contacts', chatService.getContacts)
  return {
    ...result,
    data: result.data ?? [],
  }
}

import { useQuery } from 'react-query'

import { chatService } from '@/services/chat-service'
import { IMessage } from '@/types/message'

export const useMessages = (receiverId?: string) => {
  return useQuery<IMessage[]>(
    ['messages'],
    () => chatService.getMessages(receiverId),
    {
      enabled: !!receiverId,
      initialData: [],
    }
  )
}

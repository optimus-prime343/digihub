import { useQuery } from 'react-query'

import { chatService } from '@/services/chat-service'
import { IMessage } from '@/types/message'

export const useMessages = (fromId?: string, toId?: string) => {
  return useQuery<IMessage[]>(
    ['messages'],
    () => chatService.getMessages(fromId, toId),
    {
      enabled: !!fromId && !!toId,
      initialData: [],
    }
  )
}

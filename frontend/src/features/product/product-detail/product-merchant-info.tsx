import { Button } from '@mantine/core'
import { useModals } from '@mantine/modals'

import { MessageList } from '@/features/chat'
import { useMessages } from '@/hooks/chat'
import { IMerchant } from '@/types/merchant'

export const ProductMerchantInfo = ({ merchant }: { merchant: IMerchant }) => {
  const modals = useModals()

  const { data: messages } = useMessages(merchant.id)

  const handleContact = () => {
    modals.openModal({
      title: `Chat with ${merchant.businessName}`,
      children: <MessageList messages={messages ?? []} />,
    })
  }
  return (
    <div className='max-w-sm rounded-md bg-gray-600 p-4'>
      <h3 className='heading-tertiary'>{merchant.businessName}</h3>
      <p className='mt-2 leading-relaxed'>{merchant.businessDescription}</p>
      <Button className='mt-4 bg-indigo-600' fullWidth onClick={handleContact}>
        Contact Seller
      </Button>
    </div>
  )
}

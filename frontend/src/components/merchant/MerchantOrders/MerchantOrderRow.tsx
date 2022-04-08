import { Button, Modal } from '@mantine/core'
import { format } from 'date-fns'
import Image from 'next/image'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { UpdateOrderForm } from '@/components/order'
import { IOrder } from '@/types/order'
import { OrderStatus } from '@/types/orderStatus'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  order: IOrder
}

const MerchantOrderRow: FC<Props> = ({ order }) => {
  const [opened, setOpened] = useState(false)
  const handleClick = () => {
    //   only pending orders can be updated
    if (order.orderStatus === OrderStatus.PENDING) {
      setOpened(true)
    } else {
      toast.error('You can only update pending orders')
    }
  }

  return (
    <>
      <Modal
        onClose={() => setOpened(false)}
        opened={opened}
        title='Update order'
      >
        <UpdateOrderForm
          customerName={order.user.username}
          id={order.id}
          onOrderUpdated={() => setOpened(false)}
          productName={order.product.name}
        />
      </Modal>
      <tr key={order.id}>
        <td className='py-4'>
          <div className='flex items-center gap-4'>
            <Image
              alt={order.product.name}
              className='rounded-full'
              height={75}
              objectFit='cover'
              src={getProductImageUrl(order.product.coverImage)}
              width={75}
            />
            <div>
              <h4 className='heading-tertiary'>{order.product.name}</h4>
              <p className='mt-2'>Quantity: {order.quantity}</p>
            </div>
          </div>
        </td>
        <td>
          <Button
            onClick={handleClick}
            variant={
              order.orderStatus === OrderStatus.COMPLETED ? 'filled' : 'outline'
            }
          >
            {order.orderStatus}
          </Button>
        </td>
        <td>{format(new Date(order.createdAt), 'PPP')}</td>
        <td>{`Rs.${order.quantity * order.product.price}`}</td>
      </tr>
    </>
  )
}
export default MerchantOrderRow

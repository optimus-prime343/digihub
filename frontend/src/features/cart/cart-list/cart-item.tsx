import { ActionIcon, Button, Group, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useNotifications } from '@mantine/notifications'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BiMinus } from 'react-icons/bi'
import { BsPlus } from 'react-icons/bs'
import { toast } from 'react-toastify'

import { NextLink } from '@/components/core'
import { useDeleteCart, useUpdateCartQuantity } from '@/hooks/cart'
import { useOrderCheckout } from '@/hooks/order'
import { ICart } from '@/types/cart'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  cart: ICart
}
export const CartItem = ({ cart }: Props) => {
  const loading = useRef(false)
  const modals = useModals()
  const notifications = useNotifications()

  const updateQuantity = useUpdateCartQuantity()
  const deleteCart = useDeleteCart()
  const orderCheckout = useOrderCheckout()

  const [quantity, setQuantity] = useState(cart.quantity)

  const handleOrderCheckout = async () => {
    try {
      loading.current = true
      await orderCheckout(cart.product.id, quantity)
    } catch (error: any) {
      notifications.showNotification({
        color: 'red',
        title: 'Order Checkout Failed',
        message: error.message,
      })
      loading.current = false
    }
  }
  const removeFromCart = async () => {
    try {
      await deleteCart.mutateAsync(cart.id)
      notifications.showNotification({
        title: 'Successfully removed from cart!',
        message: `${cart.product.name} has been removed from cart!`,
      })
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleQuantityChange = async (action: 'increase' | 'decrease') => {
    if (action === 'increase' && quantity < 20) {
      return setQuantity(currentQuantity => currentQuantity + 1)
    }
    if (action === 'decrease' && quantity > 1) {
      return setQuantity(currentQuantity => currentQuantity - 1)
    }
  }

  const openConfirmModal = () => {
    modals.openConfirmModal({
      title: 'Remove from cart',
      children: (
        <Text size='sm'>
          Are you sure you want to order {cart.product.name} from your cart?
        </Text>
      ),
      centered: true,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: handleOrderCheckout,
      className: 'mt-4',
    })
  }
  useEffect(() => {
    ;(async () => {
      try {
        await updateQuantity.mutateAsync({ id: cart.id, quantity })
      } catch (error: any) {
        toast.error(error.message)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.id, quantity])
  return (
    <div className='rounded-md bg-gray-600/50 p-4'>
      <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-12'>
        <Image
          alt={`${cart.product.name}`}
          className='rounded-md'
          height={150}
          objectFit='cover'
          src={getProductImageUrl(cart.product.images[0])}
          width={150}
        />
        <div className='flex-1 space-y-2'>
          <h4 className='w-48 text-xl font-bold'>
            <NextLink href={`/products/${cart.product.id}`}>
              {cart.product.name}
            </NextLink>
          </h4>
          <p>Rs {cart.product.price * quantity}</p>
        </div>
        <Group>
          <ActionIcon
            color='indigo'
            onClick={() => handleQuantityChange('increase')}
            variant='outline'
          >
            <BsPlus />
          </ActionIcon>
          <p>{quantity}</p>
          <ActionIcon
            color='red'
            onClick={() => handleQuantityChange('decrease')}
            variant='outline'
          >
            <BiMinus />
          </ActionIcon>
        </Group>
        <div className='flex items-center gap-2'>
          <Button
            className='bg-indigo-600'
            loading={loading.current}
            onClick={openConfirmModal}
          >
            Order
          </Button>
          <Button
            className='bg-red-600 hover:bg-red-500'
            onClick={removeFromCart}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

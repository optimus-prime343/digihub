import { Alert } from '@mantine/core'
import { useMemo } from 'react'

import { ICart } from '@/types/cart'

import { CartItem } from './cart-item'

interface Props {
  cartItems: ICart[]
}
export const CartList = ({ cartItems }: Props) => {
  const cartSubTotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
        0
      ),
    [cartItems]
  )
  if (cartItems.length === 0)
    return <Alert>You have no items in your cart.</Alert>
  return (
    <div className='max-w-4xl'>
      <div className='space-y-4'>
        {cartItems.map(cart => (
          <CartItem cart={cart} key={cart.id} />
        ))}
      </div>
      <p className='mt-4 flex justify-between rounded-md bg-gray-600 p-2'>
        <span>Cart Total</span>
        <span>Rs {cartSubTotal}</span>
      </p>
    </div>
  )
}

export default CartList

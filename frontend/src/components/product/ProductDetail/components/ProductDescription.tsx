import { Button, NumberInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { BsCartPlus } from 'react-icons/bs'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'

import { RatingStars } from '@/components/core'
import { useUser } from '@/hooks/auth'
import { useAddToCart } from '@/hooks/cart'
import { useOrderCheckout } from '@/hooks/order'
import { IProduct } from '@/types/product'
import { UserRole } from '@/types/user'

interface Props {
  product: IProduct
}
const ProductDescription = ({ product }: Props) => {
  const { user } = useUser()
  const router = useRouter()
  const notifications = useNotifications()

  const { mutateAsync: addToCart } = useAddToCart()
  const checkoutOrder = useOrderCheckout()

  const [quantity, setQUantity] = useState(1)

  const handleAddToCart = async () => {
    if (!user)
      return router.push({
        pathname: '/auth/login',
        query: { next: router.pathname },
      })
    try {
      await addToCart({ productId: product.id, quantity })
      notifications.showNotification({
        title: 'Added to cart',
        message: `${product.name} has been added to your cart`,
      })
    } catch (error: any) {
      notifications.showNotification({
        title: 'Failed to add item to cart',
        message: error.message,
      })
    }
  }
  return (
    <div className='max-w-xl justify-end space-y-4'>
      <h3 className='text-6xl font-bold uppercase tracking-tight'>
        {product.name}
      </h3>
      <div className='flex items-center gap-2'>
        <RatingStars rating={product.averageRating} />
        <span className='font-bold'>
          {product.totalRatings > 0
            ? `of ${product.totalRatings} reviews`
            : 'No reviews yet'}
        </span>
      </div>
      <p className='text-lg leading-relaxed'>{product.description}</p>
      <p className='max-w-xs'>
        {product.quantity > 0 ? (
          <NumberInput
            icon={<MdOutlineProductionQuantityLimits />}
            max={product.quantity}
            min={1}
            onChange={value => setQUantity(value ?? 1)}
            value={quantity}
          />
        ) : (
          <p className='inline-block rounded-md bg-red-600 p-2 font-bold'>
            Out of stock
          </p>
        )}
      </p>
      {/* Only show add-to-cart and order-now button if user role matches 'USER' and the product is not 
        out of stock
      */}
      {user?.role === UserRole.USER && product.quantity > 0 ? (
        <>
          <div className='space-x-2'>
            <Button
              leftIcon={<BsCartPlus />}
              onClick={handleAddToCart}
              variant='outline'
            >
              Add To Cart
            </Button>
            <Button
              className='bg-indigo-600'
              leftIcon={<BiPurchaseTag />}
              onClick={() => checkoutOrder(product.id, quantity)}
              variant='filled'
            >
              Order Now
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ProductDescription

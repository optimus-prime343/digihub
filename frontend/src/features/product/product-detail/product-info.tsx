import { Alert, Badge, Button, Group, NumberInput } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { FaMoneyCheckAlt } from 'react-icons/fa'

import { RatingStars } from '@/components/core'
import { useUser } from '@/hooks/auth'
import { useAddToCart } from '@/hooks/cart'
import { useOrderCheckout } from '@/hooks/order'
import { IProduct } from '@/types/product'
import { UserRole } from '@/types/user'

export const ProductInfo = ({ product }: { product: IProduct }) => {
  const { showNotification } = useNotifications()
  const router = useRouter()
  const { user } = useUser()
  const orderCheckout = useOrderCheckout()
  const addToCart = useAddToCart()

  const [quantity, setQuantity] = useState(1)
  const [isRedirectingToPayment, setIsRedirectingToPayment] = useState(false)

  // directly purchase product before adding to the cart
  const handleOrderCheckout = async () => {
    setIsRedirectingToPayment(true)
    try {
      await orderCheckout(product.id, quantity)
    } catch (error: any) {
      showNotification({
        color: 'red',
        title: 'Order Checkout Failed',
        message: error.message,
      })
    }
  }
  // add product to the cart for future purchase
  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity })
      await router.push('/profile#cart')
      showNotification({
        title: 'Added to Cart',
        message: `${product?.name} has been added to your cart`,
      })
    } catch (error: any) {
      showNotification({
        title: 'Add to Cart Failed',
        message: error.message,
      })
    }
  }
  return (
    <aside className='max-w-xl space-y-4'>
      <h2 className='heading-primary'>{product.name}</h2>
      <div className='flex items-center gap-2'>
        <RatingStars rating={product.averageRating} />
        <p>
          {product.totalRatings > 0
            ? `of ${product.totalRatings} ${
                product.totalRatings > 1 ? 'ratings' : 'rating'
              }`
            : 'No reviews yet'}
        </p>
      </div>
      <p className='space-y-2 text-lg'>
        {product.description.split('\n').map((line, index) => (
          <span className='block' key={index}>
            {line}
          </span>
        ))}
      </p>
      <p className='flex flex-wrap gap-2 capitalize'>
        {product.tags.map((tag, index) => (
          <Badge key={index} size='md'>
            {tag}
          </Badge>
        ))}
      </p>
      <p>Rs {product.price}</p>
      {product.quantity === 0 && (
        <Alert color='red' variant='filled'>
          Out of stock
        </Alert>
      )}
      {/* Show order-now and add-to-cart buttons if the quantity of product is greater than 0
              and user role matches "USER"
            */}
      {user && user.role === UserRole.USER && product.quantity > 0 ? (
        <>
          <NumberInput
            className='max-w-xs'
            max={product.quantity}
            min={product.quantity === 0 ? 0 : 1}
            onChange={value => setQuantity(value ?? 1)}
            value={quantity}
          />
          <Group>
            <Button
              className='bg-indigo-600'
              leftIcon={<FaMoneyCheckAlt />}
              loading={isRedirectingToPayment}
              onClick={handleOrderCheckout}
            >
              {isRedirectingToPayment ? 'Processing...' : 'Order Now'}
            </Button>
            <Button
              leftIcon={<BsCart />}
              onClick={handleAddToCart}
              variant='outline'
            >
              Add to Cart
            </Button>
          </Group>
        </>
      ) : null}
    </aside>
  )
}

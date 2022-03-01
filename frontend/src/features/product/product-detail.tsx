import {
  Badge,
  Button,
  Card,
  Group,
  NumberInput,
  Text,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import Image from 'next/image'
import { useState } from 'react'
import { BsCart } from 'react-icons/bs'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { useQuery } from 'react-query'

import { NextLink, RatingStars } from '@/components/core'
import { AddReviewForm } from '@/features/product'
import { ProductReviewList } from '@/features/product/product-review-list'
import { useUser } from '@/hooks/auth'
import { useAddToCart } from '@/hooks/cart'
import { useOrderCheckout, useUserOrders } from '@/hooks/order'
import { useRecommendProducts } from '@/hooks/product'
import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'
import { UserRole } from '@/types/user'
import { getProductImageUrl } from '@/utils/getImageUrl'
import { hasPurchasedProduct } from '@/utils/has-purchased-product'

interface Props {
  product: IProduct
}

export const ProductDetail = ({ product: initialData }: Props) => {
  const notifications = useNotifications()
  const orderCheckout = useOrderCheckout()
  const addToCart = useAddToCart()
  // renaming variable data to product and setting initialdata based on the data received from the server
  const { data: product = initialData } = useQuery(
    ['product', initialData.id],
    () => productService.getProduct(initialData.id),
    { initialData: initialData }
  )
  const { data: orders } = useUserOrders()
  const { user } = useUser()
  // remove the currnt product from the list of recommended products to avoid recommneding the same product
  const recommededProducts = useRecommendProducts(product.tags).filter(
    recommendedProduct => recommendedProduct.id !== product.id
  )
  const [quantity, setQuantity] = useState(1)

  //media query to resize recommened product images on smaller viewports
  const isMobile = useMediaQuery('(max-width: 768px)')

  // directly purchase product before adding to the cart
  const handleOrderCheckout = async () => {
    try {
      await orderCheckout(product.id, quantity)
    } catch (error: any) {
      notifications.showNotification({
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
      notifications.showNotification({
        title: 'Added to Cart',
        message: `${product?.name} has been added to your cart`,
      })
    } catch (error: any) {
      notifications.showNotification({
        title: 'Add to Cart Failed',
        message: error.message,
      })
    }
  }
  if (!product) return <p>Product Not found</p>
  return (
    <section className='p-4 lg:px-8 lg:py-4'>
      <div className='flex flex-col items-start gap-4 lg:flex-row lg:gap-24'>
        <div className='max-w-md space-y-4'>
          <Image
            alt={`${product.name} cover`}
            className='rounded-md shadow-md'
            height={450}
            objectFit='cover'
            src={getProductImageUrl(product.coverImage)}
            width={450}
          />
          <Card padding='sm' shadow='sm'>
            <Text weight={500}>{product.merchant.businessName}</Text>
            <Text className='mt-2 leading-relaxed text-gray-200'>
              {product.merchant.businessDescription}
            </Text>
            <Button className='mt-4 bg-indigo-600' fullWidth>
              Contact Seller
            </Button>
          </Card>
        </div>
        <div>
          <aside className='max-w-xl space-y-4'>
            <Title order={1}>{product.name}</Title>
            <div className='flex items-center gap-2'>
              <RatingStars rating={product.averageRating} />
              <Text size='sm'>
                {product.totalRatings > 0
                  ? `of ${product.totalRatings} ratings`
                  : 'No reviews yet'}
              </Text>
            </div>
            <p className='space-y-2 text-lg text-gray-200'>
              {product.description.split('\n').map((line, index) => (
                <Text className='block leading-relaxed' key={index}>
                  {line}
                </Text>
              ))}
            </p>
            <p className='flex flex-wrap gap-2 capitalize'>
              {product.tags.map((tag, index) => (
                <Badge key={index} size='md'>
                  {tag}
                </Badge>
              ))}
            </p>
            <Text>Rs {product.price}</Text>
            {user && user.role === UserRole.USER ? (
              <>
                <NumberInput
                  className='max-w-xs'
                  max={product.quantity}
                  min={1}
                  onChange={value => setQuantity(value ?? 1)}
                  value={quantity}
                />
                <Group>
                  <Button
                    className='bg-indigo-600'
                    leftIcon={<FaMoneyCheckAlt />}
                    onClick={handleOrderCheckout}
                  >
                    Order Now
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
          <div className='mt-6'>
            {/* Only show add review form if the user has purchased the product */}
            {hasPurchasedProduct(orders ?? [], product.id) && <AddReviewForm />}
            {product.reviews.length > 0 && (
              <div className='space-y-2'>
                <Title order={2}>Reviews</Title>
                <ProductReviewList reviews={product.reviews} />
              </div>
            )}
          </div>
        </div>
      </div>
      {recommededProducts.length > 0 && (
        <div className='mt-12'>
          <Title order={2}>Recommended Products</Title>
          <div className='mt-4 flex flex-col flex-nowrap items-start gap-4 lg:flex-row'>
            {recommededProducts.map(product => (
              <NextLink href={`/products/${product.id}`} key={product.id}>
                <Image
                  alt={product.name}
                  className='overflow-hidden rounded-md transition-transform duration-500 hover:scale-105'
                  height={isMobile ? 300 : 200}
                  objectFit='cover'
                  src={getProductImageUrl(product.coverImage)}
                  width={isMobile ? 400 : 200}
                />
              </NextLink>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

import { Alert, Tabs } from '@mantine/core'
import Image from 'next/image'
import { BsInfoCircle } from 'react-icons/bs'
import { MdRecommend, MdReviews } from 'react-icons/md'
import { useQuery } from 'react-query'

import { AddReviewForm } from '@/features/product/add-review-form'
import { useUser } from '@/hooks/auth'
import { useUserOrders } from '@/hooks/order'
import { useRecommendProducts } from '@/hooks/product'
import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'
import { hasPurchasedProduct } from '@/utils/has-purchased-product'

import { ProductInfo } from './product-info'
import { ProductMerchantInfo } from './product-merchant-info'
import { ProductReviews } from './product-reviews'
import { RecommendedProducts } from './recommended-products'

interface Props {
  product: IProduct
}

export const ProductDetail = ({ product: initialData }: Props) => {
  // setting initialdata product data based on the data received from the server
  const { user } = useUser()
  const { data: orders = [] } = useUserOrders()
  const { data: product = initialData } = useQuery(
    ['product', initialData.id],
    () => productService.getProduct(initialData.id),
    { initialData: initialData }
  )
  // remove the currnt product from the list of recommended products to avoid recommending the same product
  const recommededProducts = useRecommendProducts(product.tags).filter(
    recommendedProduct => recommendedProduct.id !== product.id
  )
  // check if the user has alreay reviewed the product or not
  const hasReviewd = user
    ? product.reviews.some(review => review.user.id === user.id)
    : false
  if (!product) return <p>Product Not found</p>
  return (
    <section className='p-4 lg:px-8 lg:py-4'>
      <div className='flex flex-col items-start gap-4 lg:flex-row lg:gap-12'>
        <Image
          alt={`${product.name} cover`}
          className='rounded-md shadow-md'
          height={400}
          objectFit='cover'
          src={getProductImageUrl(product.coverImage)}
          width={600}
        />
        <ProductInfo product={product} />
      </div>
      <Tabs mt='lg'>
        <Tabs.Tab icon={<BsInfoCircle />} label='Merchant Information'>
          <ProductMerchantInfo merchant={product.merchant} />
        </Tabs.Tab>
        <Tabs.Tab icon={<MdReviews />} label='Reviews'>
          {hasPurchasedProduct(orders, product.id) && !hasReviewd ? (
            <AddReviewForm />
          ) : null}
          {product.reviews.length > 0 ? (
            <ProductReviews product={product} />
          ) : (
            <Alert>No reviews yet</Alert>
          )}
        </Tabs.Tab>
        <Tabs.Tab icon={<MdRecommend />} label='Recommended Products'>
          <RecommendedProducts products={recommededProducts} />
        </Tabs.Tab>
      </Tabs>
    </section>
  )
}

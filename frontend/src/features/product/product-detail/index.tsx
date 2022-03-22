import Image from 'next/image'
import { useQuery } from 'react-query'

import { useRecommendProducts } from '@/hooks/product'
import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

import { ProductInfo } from './product-info'
import { ProductMerchantInfo } from './product-merchant-info'
import { ProductReviews } from './product-reviews'
import { RecommendedProducts } from './recommended-products'

interface Props {
  product: IProduct
}

export const ProductDetail = ({ product: initialData }: Props) => {
  // setting initialdata product data based on the data received from the server
  const { data: product = initialData } = useQuery(
    ['product', initialData.id],
    () => productService.getProduct(initialData.id),
    { initialData: initialData }
  )
  // remove the currnt product from the list of recommended products to avoid recommending the same product
  const recommededProducts = useRecommendProducts(product.tags).filter(
    recommendedProduct => recommendedProduct.id !== product.id
  )
  if (!product) return <p>Product Not found</p>
  return (
    <section className='p-4 lg:px-8 lg:py-4'>
      <div className='flex flex-col items-start gap-4 lg:flex-row lg:gap-12'>
        <div className='space-y-4'>
          <Image
            alt={`${product.name} cover`}
            className='rounded-md shadow-md'
            height={400}
            objectFit='cover'
            src={getProductImageUrl(product.coverImage)}
            width={600}
          />
          <ProductMerchantInfo merchant={product.merchant} />
        </div>
        <div>
          <ProductInfo product={product} />
          <ProductReviews product={product} />
        </div>
      </div>
      {recommededProducts.length > 0 && (
        <RecommendedProducts products={recommededProducts} />
      )}
    </section>
  )
}

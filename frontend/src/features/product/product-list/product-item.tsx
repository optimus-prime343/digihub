import { Text } from '@mantine/core'
import Image from 'next/image'

import { NextLink, RatingStars } from '@/components/core'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  product: IProduct
}
export const ProductItem = ({ product }: Props) => {
  return (
    <NextLink
      className='overflow-hidden rounded-md bg-gray-600/75 p-2 backdrop-blur-sm'
      href={`/products/${product.id}`}
    >
      <Image
        alt={product.name}
        className='rounded-md shadow-md'
        height={300}
        objectFit='cover'
        src={getProductImageUrl(product.coverImage)}
        width={400}
      />
      <div className='space-y-2'>
        <h3 className='heading-tertiary mt-2'>{product.name}</h3>
        <p className='font-semibold'>{product.merchant.businessName}</p>
        <div className='flex items-center gap-2'>
          <RatingStars rating={product.averageRating} />
          <span>({product.totalRatings})</span>
        </div>
        <Text>Rs {product.price}</Text>
      </div>
    </NextLink>
  )
}

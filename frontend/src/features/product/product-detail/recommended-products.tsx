import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'

import { NextLink } from '@/components/core'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

export const RecommendedProducts = ({ products }: { products: IProduct[] }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className='mt-12'>
      <h3 className='heading-tertiary'>Recommended Products</h3>
      <div className='mt-4 flex flex-col flex-nowrap items-start gap-4 lg:flex-row'>
        {products.map(product => (
          <NextLink
            className='overflow-hidden rounded-md'
            href={`/products/${product.id}`}
            key={product.id}
          >
            <Image
              alt={product.name}
              className='transition-transform duration-500 hover:scale-105'
              height={isMobile ? 300 : 200}
              objectFit='cover'
              src={getProductImageUrl(product.coverImage)}
              width={isMobile ? 400 : 200}
            />
          </NextLink>
        ))}
      </div>
    </div>
  )
}

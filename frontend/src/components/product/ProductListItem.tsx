import Image from 'next/image'
import React, { FC } from 'react'

import { NextLink, RatingStars } from '@/components/core'
import { IProduct } from '@/types/product'
import { getProductImageUrl } from '@/utils/getImageUrl'

interface Props {
  product: IProduct
}

const ProductListItem: FC<Props> = ({ product }) => {
  return (
    <article className='rounded-md bg-gray-800' key={product.id}>
      <Image
        alt={`${product.name} cover`}
        className='rounded-md bg-green-600'
        height={300}
        objectFit='cover'
        src={getProductImageUrl(product.images[0])}
        width={400}
      />
      <div className='space-y-2 py-2 px-4'>
        <h4 className='flex items-center justify-between'>
          <NextLink
            className='text-xl font-semibold hover:text-neutral-300'
            href={`/products/${product.id}`}
          >
            {product.name}
          </NextLink>
        </h4>
        <RatingStars rating={product.totalRatings} />
        <p className='mt-0 text-xl font-bold'>Rs. {product.price}</p>
      </div>
    </article>
  )
}

export default ProductListItem

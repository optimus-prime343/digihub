import Image from 'next/image'
import React, { FC } from 'react'

import NextLink from '~shared/next-link'
import { IProduct } from '~types/product'
import { getProductImageUrl } from '~utils/getImageUrl'

interface ProductListItemProperties {
  product: IProduct
}

const ProductListItem: FC<ProductListItemProperties> = ({ product }) => {
  return (
    <article key={product.id}>
      <Image
        alt={`${product.name} cover`}
        className='rounded-md bg-green-600'
        height={300}
        objectFit='cover'
        src={getProductImageUrl(product.images[0])}
        width={400}
      />
      <div className='py-2'>
        <h4 className='mt-4'>
          <NextLink
            className='text-xl font-semibold hover:text-neutral-300'
            href={`/products/${product.id}`}
          >
            {product.name}
          </NextLink>
        </h4>
        <p className='mt-2 text-xl font-bold'>Rs. {product.price}</p>
      </div>
    </article>
  )
}

export default ProductListItem

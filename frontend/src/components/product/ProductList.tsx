import { Button } from '@mantine/core'
import React from 'react'
import { BsCart, BsInfo } from 'react-icons/bs'

import { NextLink } from '@/components/core'
import { ProductListItem } from '@/components/product'
import { IProduct } from '@/types/product'

interface Props {
  products: IProduct[]
}
const ProductList = ({ products }: Props) => {
  return (
    <div className='grid gap-6 lg:grid-cols-4'>
      {products.map(product => (
        <div key={product.id}>
          <ProductListItem product={product} />
          <div className='mt-4 flex items-center gap-2'>
            <Button className='bg-indigo-600' leftIcon={<BsCart />} size='md'>
              Add To Cart
            </Button>
            <Button
              className='bg-gray-800 hover:bg-gray-700/25'
              leftIcon={<BsInfo size={25} />}
              size='md'
            >
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList

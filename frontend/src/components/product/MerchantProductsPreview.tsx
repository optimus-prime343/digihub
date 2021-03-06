import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

import { NextLink } from '@/components/core'
import ProductListItem from '@/components/product/ProductListItem'
import { useMerchantProducts } from '@/hooks/product'

const MerchantProductsPreview = () => {
  const { products } = useMerchantProducts()
  if (products.length === 0)
    return (
      <div className='p-4 lg:p-6'>
        <p className='inline-block rounded-md bg-yellow-50 p-4 text-lg text-yellow-600'>
          You have not added any products yet.
          <NextLink className='font-semibold' href='/merchant/add-product'>
            Add a new product ?
          </NextLink>
        </p>
      </div>
    )
  return (
    <div className='p-4 lg:px-8 lg:py-4'>
      <div>
        <h3 className='heading-secondary mb-6'>Your Products</h3>
        <div className='flex flex-col items-start gap-4 lg:flex-row lg:items-center'>
          {products.slice(0, 4).map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
          <button className='btn bg-indigo-600'>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MerchantProductsPreview

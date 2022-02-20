import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { Layout } from '@/components/core'
import { ProductList } from '@/components/product'
import { useProduct } from '@/context/product'

const UserHome = () => {
  const router = useRouter()
  const searchQuery = router.query.search as string
  const { products } = useProduct()
  const filteredProducts = useMemo(
    () =>
      searchQuery
        ? products.filter(product =>
            product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
        : products,
    [products, searchQuery]
  )
  return (
    <Layout title='Digihub | Browse Products'>
      <div className='p-4 lg:mt-6 lg:px-8 lg:py-0'>
        <h3 className='heading-secondary mb-4'>
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : 'Browse Products'}
        </h3>
        <ProductList products={filteredProducts} />
      </div>
    </Layout>
  )
}

export default UserHome

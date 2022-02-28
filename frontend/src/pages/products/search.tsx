import { GetServerSideProps } from 'next'
import React from 'react'

import { ProductList } from '@/components/product'
import { productService } from '@/services/product-service'
import { IProduct } from '@/types/product'

interface Props {
  searchQuery: string
  products: IProduct[]
}

const AllSearchResultsPage = ({ searchQuery, products }: Props) => {
  return (
    <div className='p-4 lg:px-8 lg:py-4'>
      <h3 className='heading-secondary mb-4 text-gray-200'>
        Found {products.length} {products.length > 1 ? 'results' : 'result'} for{' '}
        <span className='font-bold text-white'>{searchQuery}</span>
      </h3>
      <ProductList products={products} />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const searchQuery = context.query.searchQuery as string
  const products = await productService.searchProducts(searchQuery)
  return {
    props: {
      searchQuery,
      products,
    },
  }
}
export default AllSearchResultsPage

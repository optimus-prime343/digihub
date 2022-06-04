import { Pagination, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

import { Layout } from '@/components/core'
import { FullPageLoader } from '@/components/ui'
import { PRODUCTS_PER_PAGE } from '@/constants'
import {
  FeaturedProducts,
  ProductList,
  SearchProducts,
  SortProducts,
} from '@/features/product'
import { useProducts } from '@/hooks/product'
import { IProduct } from '@/types/product'

interface Props {
  /**
   * Total number of products in the entire database
   */
  totalProducts: number
}

export const UserHomepageContent = ({ totalProducts }: Props) => {
  // pagination
  const [page, setPage] = useState(1)
  const { products, isLoading } = useProducts(page)
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])

  useEffect(() => {
    setSortedProducts(products)
  }, [products])

  if (isLoading) return <FullPageLoader />
  return (
    <Layout title='Digihub | Browse Products'>
      <div className='space-y-4 p-4 lg:mt-6 lg:px-8 lg:py-0'>
        <div className='flex flex-col justify-between gap-2 md:flex-row md:gap-0'>
          <SearchProducts />
          <SortProducts
            onSort={products => setSortedProducts([...products])}
            products={products}
          />
        </div>
        <Title order={2}>Featured Products</Title>
        <FeaturedProducts />
        <ProductList products={sortedProducts} />
        <Pagination
          onChange={setPage}
          page={page}
          total={Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}
          withEdges
        />
      </div>
    </Layout>
  )
}

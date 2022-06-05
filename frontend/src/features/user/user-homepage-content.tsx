import { Pagination, Title } from '@mantine/core'
import { useEffect, useState } from 'react'

import { Layout } from '@/components/core'
import { FullPageLoader } from '@/components/ui'
import { PRODUCTS_PER_PAGE } from '@/constants'
import { FeaturedProducts, ProductList, SortProducts } from '@/features/product'
import { useFeaturedProducts, useProducts } from '@/hooks/product'
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
  const { products, isLoading } = useProducts(false, page)
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>([])

  const featuredProducts = useFeaturedProducts()

  useEffect(() => {
    setSortedProducts(products)
  }, [products])

  if (isLoading) return <FullPageLoader />
  return (
    <Layout title='Digihub | Browse Products'>
      <div className='space-y-4 p-4 lg:mt-6 lg:px-8 lg:py-0'>
        {featuredProducts.length > 0 && (
          <>
            <Title className='uppercase' mb='md' order={2}>
              Featured Products
            </Title>
            <FeaturedProducts featuredProducts={featuredProducts} />
          </>
        )}
        <div className='flex justify-end'>
          <SortProducts
            onSort={products => setSortedProducts([...products])}
            products={products}
          />
        </div>
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

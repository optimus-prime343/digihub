import { Pagination } from '@mantine/core'
import { useState } from 'react'

import { Layout } from '@/components/core'
import { FullPageLoader } from '@/components/ui'
import { ProductList, SearchProducts } from '@/features/product'
import { useProducts } from '@/hooks/product'

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

  if (isLoading) return <FullPageLoader />
  return (
    <Layout title='Digihub | Browse Products'>
      <div className='space-y-4 p-4 lg:mt-6 lg:px-8 lg:py-0'>
        <SearchProducts />
        <ProductList products={products} />
        <Pagination
          onChange={setPage}
          page={page}
          total={Math.ceil(totalProducts / 10)}
          withEdges
        />
      </div>
    </Layout>
  )
}

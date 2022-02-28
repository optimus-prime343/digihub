import { Pagination } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { Layout } from '@/components/core'
import { ProductList } from '@/components/product'
import { FullPageLoader } from '@/components/ui'
import { SearchProducts } from '@/components/user'
import { useProducts } from '@/hooks/product'

const UserHome = () => {
  const [page, setPage] = useState(1)
  const router = useRouter()
  const searchQuery = router.query.search as string
  const { products, isLoading } = useProducts(page)
  const filteredProducts = useMemo(
    () =>
      searchQuery
        ? products.filter(product =>
            product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
        : products,
    [products, searchQuery]
  )
  if (isLoading) return <FullPageLoader />
  return (
    <Layout title='Digihub | Browse Products'>
      <div className='space-y-4 p-4 lg:mt-6 lg:px-8 lg:py-0'>
        <SearchProducts />
        <ProductList products={filteredProducts} />
        <Pagination onChange={setPage} page={page} total={10} withEdges />
      </div>
    </Layout>
  )
}
export default UserHome

import { Alert } from '@mantine/core'
import { AiOutlineWarning } from 'react-icons/ai'

import { NextLink } from '@/components/core'
import { FullPageLoader, MerchantSidebar } from '@/components/ui'
import { useMerchantProducts } from '@/hooks/product'

import MerchantProductItem from './MerchantProductItem'

const MerchantProducts = () => {
  const { products, isLoading } = useMerchantProducts()
  if (isLoading) return <FullPageLoader />
  return (
    <MerchantSidebar>
      {products.length > 0 ? (
        <div>
          <h4 className='heading-tertiary mb-4'>Your Products</h4>
          <div className='grid gap-2 lg:grid-cols-3'>
            {products.map(product => (
              <MerchantProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className='space-y-2'>
          <Alert color='yellow' icon={<AiOutlineWarning />} variant='filled'>
            <h4>You dont seem to have any products</h4>
          </Alert>
          <NextLink
            className='btn inline-block bg-indigo-600'
            href='/merchant/add-product'
          >
            Add Product
          </NextLink>
        </div>
      )}
    </MerchantSidebar>
  )
}

export default MerchantProducts

import { Alert } from '@mantine/core'
import { AiOutlineWarning } from 'react-icons/ai'

import { useProduct } from '~context/product'
import MerchantProduct from '~product/merchant-product'
import NextLink from '~shared/next-link'

// import MerchantProduct from '../'
import Sidebar from './sidebar'

const Products = () => {
  const { merchantProducts } = useProduct()
  return (
    <Sidebar>
      {merchantProducts.length > 0 ? (
        <div>
          <h4 className='heading-tertiary mb-4'>Your Products</h4>
          <div className='grid gap-6 lg:grid-cols-3'>
            {merchantProducts.map(product => (
              <MerchantProduct key={product.id} product={product} />
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
    </Sidebar>
  )
}

export default Products

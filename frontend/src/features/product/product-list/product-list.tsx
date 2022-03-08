import { IProduct } from '@/types/product'

import { ProductItem } from './product-item'

interface Props {
  products: IProduct[]
}
export const ProductList = ({ products }: Props) => {
  return (
    <div className='grid gap-4 lg:grid-cols-4'>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

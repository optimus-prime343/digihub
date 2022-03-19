import { IProduct } from '../../typings/product'
import { ProductItem } from './product-item'

interface Props {
  products: IProduct[]
}
export const ProductList = ({ products }: Props) => {
  return (
    <div className='grid items-start gap-4 lg:grid-cols-4'>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

import { ProductListItem } from '@/components/product'
import { IProduct } from '@/types/product'

interface Props {
  products: IProduct[]
}
const ProductList = ({ products }: Props) => {
  return (
    <div className='grid gap-6 lg:grid-cols-4'>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList

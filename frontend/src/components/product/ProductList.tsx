import { ProductListItem } from '@/components/product'
import { IProduct } from '@/types/product'

interface Props {
  products: IProduct[]
}
const ProductList = ({ products }: Props) => {
  return (
    <div className='grid gap-6 lg:grid-cols-4'>
      {products.map(product => (
        <div key={product.id}>
          <ProductListItem product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductList

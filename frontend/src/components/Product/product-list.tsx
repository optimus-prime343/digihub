import { FC } from 'react'

import { IProduct } from '~types/product'

import ProductListItem from './product-list-item'

interface ProductListProperties {
  products: IProduct[]
}

const ProductList: FC<ProductListProperties> = ({ products }) => {
  return (
    <div>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList

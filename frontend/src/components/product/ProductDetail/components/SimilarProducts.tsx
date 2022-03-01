import { useMemo } from 'react'

import { ProductList } from '@/components/product'
import { useProducts } from '@/hooks/product'

interface Props {
  similarTo: string
}
const SimilarProducts = ({ similarTo }: Props) => {
  const { products } = useProducts()
  const similarProducts = useMemo(
    () =>
      products
        .filter(
          product =>
            product.name !== similarTo &&
            product.name.toLowerCase().includes(similarTo.toLowerCase())
        )
        .slice(0, 4),
    [products, similarTo]
  )
  if (similarProducts.length === 0) return null
  return (
    <div>
      <h3 className='heading-secondary'>Products similar to {similarTo}</h3>
      <ProductList products={similarProducts} />
    </div>
  )
}

export default SimilarProducts

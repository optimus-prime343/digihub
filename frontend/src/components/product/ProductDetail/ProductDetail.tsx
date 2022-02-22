import { IProduct } from '@/types/product'

import MerchantInformation from './components/MerchantInformation'
import ProductDescription from './components/ProductDescription'
import ProductDetailImage from './components/ProductDetailImage'
import SimilarProducts from './components/SimilarProducts'

interface Props {
  product: IProduct
}

const ProductDetail = ({ product }: Props) => {
  return (
    <div className='p-4 py-4 lg:px-8'>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-12'>
        <ProductDetailImage
          images={product.images}
          productName={product.name}
        />
        <ProductDescription product={product} />
      </div>
      <MerchantInformation merchant={product.merchant} />
      <SimilarProducts similarTo={product.name} />
    </div>
  )
}

export default ProductDetail

import Image from 'next/image'

import { IProduct } from '../../typings/product'
import { getImageUrl } from '../../utils/get-image-url'

interface Props {
  product: IProduct
}
const ProductInfo = ({ product }: Props) => {
  return (
    <div className='space-y-2'>
      <Image
        src={getImageUrl('product', product.coverImage)}
        width={200}
        height={200}
        alt={product.name}
        objectFit='cover'
        className='rounded-md'
      />
      <h3 className='heading'>{product.name}</h3>
      <p className='leading-relaxed text-gray-600'>{product.description}</p>
      <p className='rounded-sm bg-yellow-100 p-2 text-yellow-600'>
        {product.averageRating} of {product.totalRatings} Reviews
      </p>
      <p className='text-lg font-bold text-green-600'>Rs {product.price}</p>
    </div>
  )
}

export default ProductInfo

import { RatingStars } from '@/components/core'
import { IProduct } from '@/types/product'

interface Props {
  product: IProduct
}
const ProductDescription = ({ product }: Props) => {
  return (
    <div className='max-w-xl justify-end space-y-4'>
      <h3 className='text-6xl font-bold uppercase tracking-tight'>
        {product.name}
      </h3>
      <div className='flex items-center gap-2'>
        <RatingStars rating={product.averageRating} />
        <span className='font-bold'>
          {product.totalRatings > 0
            ? `of ${product.totalRatings} reviews`
            : 'No reviews yet'}
        </span>
      </div>
      <p className='text-lg leading-relaxed text-gray-400'>
        {product.description}
      </p>
      <div className='space-x-2'>
        <button className='btn bg-gray-800'>Add to Cart</button>
        <button className='btn bg-indigo-600'>Order Now</button>
      </div>
    </div>
  )
}

export default ProductDescription

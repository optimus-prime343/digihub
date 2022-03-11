import { IProductReview } from '@/types/product'

import { ProductReviewItem } from './product-review-item'

interface Props {
  reviews: IProductReview[]
}
export const ProductReviewList = ({ reviews }: Props) => {
  return (
    <div className='space-y-4'>
      {reviews.map(review => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

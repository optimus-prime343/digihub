import { IProductReview } from '@/types/product'

import { ProductReviewItem } from './product-review-item'

interface Props {
  reviews: IProductReview[]
}
export const ProductReviewList = ({ reviews }: Props) => {
  return (
    <div>
      {reviews.map(review => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

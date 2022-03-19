import { IReview } from '../../../typings/product'
import { ReviewItem } from './review-item'

interface Props {
  reviews: IReview[]
}
export const ReviewList = ({ reviews }: Props) => {
  return (
    <div className='space-y-4'>
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

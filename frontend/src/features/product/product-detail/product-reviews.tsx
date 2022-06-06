import { ProductReviewList } from '@/features/product/product-review-list'
import { IProduct } from '@/types/product'

export const ProductReviews = ({ product }: { product: IProduct }) => {
  return (
    <div>
      {/* Only show add review form if the user has purchased the product and haven't left a review */}
      {product.reviews.length > 0 && (
        <div className='space-y-4'>
          <h3 className='heading-secondary'>Reviews</h3>
          <ProductReviewList reviews={product.reviews} />
        </div>
      )}
    </div>
  )
}

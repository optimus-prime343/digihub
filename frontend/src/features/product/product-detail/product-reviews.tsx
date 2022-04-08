import { AddReviewForm } from '@/features/product/add-review-form'
import { ProductReviewList } from '@/features/product/product-review-list'
import { useUser } from '@/hooks/auth'
import { useUserOrders } from '@/hooks/order'
import { IProduct } from '@/types/product'
import { hasPurchasedProduct } from '@/utils/has-purchased-product'

export const ProductReviews = ({ product }: { product: IProduct }) => {
  const { user } = useUser()
  const { data: orders } = useUserOrders()
  const hasAlreadyReviewed = product.reviews.some(
    review => review.user.id === user?.id
  )
  return (
    <div>
      {/* Only show add review form if the user has purchased the product and haven't left a review */}
      {hasPurchasedProduct(orders ?? [], product.id) && !hasAlreadyReviewed ? (
        <AddReviewForm />
      ) : null}
      {product.reviews.length > 0 && (
        <div className='space-y-4'>
          <h3 className='heading-secondary'>Reviews</h3>
          <ProductReviewList reviews={product.reviews} />
        </div>
      )}
    </div>
  )
}

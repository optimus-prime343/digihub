import { Text } from '@mantine/core'
import { format } from 'date-fns'
import Image from 'next/image'

import { RatingStars } from '@/components/core'
import { IProductReview } from '@/types/product'
import { getProfileImageUrl } from '@/utils/getImageUrl'

interface Props {
  review: IProductReview
}
export const ProductReviewItem = ({ review }: Props) => {
  return (
    <div className='flex flex-col gap-4 rounded-md bg-gray-600 p-2 lg:flex-row lg:gap-12'>
      <div>
        <Image
          alt={review.user.username}
          className='rounded-md'
          height={100}
          src={getProfileImageUrl(review.user.image)}
          width={100}
        />
        <Text weight={500}>
          {`${review.user.firstName} ${review.user.lastName}`}
        </Text>
        <Text className='text-gray-200'>
          {format(new Date(review.createdAt), 'PPP')}
        </Text>
      </div>
      <div>
        <RatingStars rating={review.rating} size={25} />
        <Text className='mt-4 mb-2'>{review.rating} out of 5</Text>
        <Text className='max-w-md leading-relaxed'>{review.review}</Text>
      </div>
    </div>
  )
}

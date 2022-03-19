import { format } from 'date-fns'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'

import { IReview } from '../../../typings/product'
import { getImageUrl } from '../../../utils/get-image-url'

interface Props {
  review: IReview
}
export const ReviewItem = ({ review }: Props) => {
  return (
    <div className='rounded-sm bg-gray-100 p-2'>
      <div className='flex items-start gap-4'>
        <Image
          src={getImageUrl('profile', review.user.image)}
          width={50}
          height={50}
          className='rounded-full'
          alt={review.user.username}
        />
        <div className='flex-1'>
          <p className='text-lg font-medium'>{review.user.username}</p>
          <p className='text-sm text-gray-400'>
            {format(new Date(review.createdAt), 'PPPP')}
          </p>
          <p className='my-1 font-bold text-yellow-600'>{review.rating} out of 5</p>
          <p>{review.review}</p>
        </div>
        <button type='button'>
          <MdDeleteOutline className='h-6 w-6 rounded-full fill-red-600' size={20} />
        </button>
      </div>
    </div>
  )
}

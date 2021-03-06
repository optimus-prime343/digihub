import { Menu, Text } from '@mantine/core'
import { useModals } from '@mantine/modals'
import { useNotifications } from '@mantine/notifications'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsPen, BsTrash } from 'react-icons/bs'

import { useUser } from '@/hooks/auth'
import { useDeleteReview } from '@/hooks/review'
import { IProductReview } from '@/types/product'
import { getProfileImageUrl } from '@/utils/getImageUrl'

import { UpdateReviewForm } from '../update-review-form'

interface Props {
  review: IProductReview
}
export const ProductReviewItem = ({ review }: Props) => {
  const router = useRouter()
  const modal = useModals()
  const { showNotification } = useNotifications()

  const { user } = useUser()

  const productId = router.query.id as string
  const deleteReview = useDeleteReview(productId)

  const openUpdateModal = () =>
    modal.openModal({
      id: 'update-review-modal',
      title: 'Update Review',
      children: <UpdateReviewForm productId={productId} review={review} />,
    })
  const openDeleteModal = () =>
    modal.openConfirmModal({
      centered: true,
      title: 'Delete Review',
      children: (
        <Text size='sm'>Are you sure you want to delete your review ?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: {
        loading: deleteReview.isLoading,
      },
      onConfirm: async () => {
        try {
          await deleteReview.mutateAsync({
            productId,
            reviewId: review.id,
          })
          showNotification({
            title: 'Review Deleted',
            message: 'Your review has been deleted',
          })
        } catch (error: any) {
          showNotification({
            color: 'red',
            title: 'Delete Review Failed',
            message: error.message,
          })
        }
      },
    })
  return (
    <div className='flex flex-col items-start gap-4 rounded-md bg-gray-600 p-2 lg:max-w-lg lg:flex-row'>
      <Image
        alt={review.user.username}
        className='rounded-full'
        height={50}
        objectFit='cover'
        src={getProfileImageUrl(review.user.image)}
        width={50}
      />
      <div className='flex-1'>
        <Text weight={700}>{review.rating} out of 5</Text>
        <Text size='sm'>{format(new Date(review.createdAt), 'PPP')}</Text>
        <Text className='mt-2 max-w-2xl leading-relaxed'>{review.review}</Text>
      </div>
      {user && user.id === review.user.id && (
        <Menu>
          <Menu.Item
            className='hover:bg-gray-500'
            icon={<BsPen />}
            onClick={openUpdateModal}
          >
            Update
          </Menu.Item>
          <Menu.Item color='red' icon={<BsTrash />} onClick={openDeleteModal}>
            Delete
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

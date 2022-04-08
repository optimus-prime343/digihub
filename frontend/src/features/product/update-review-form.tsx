import { Button, NumberInput, Textarea } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import { useFormik } from 'formik'

import { useUpdateReview } from '@/hooks/review/use-update-review'
import { IProductReview } from '@/types/product'

interface Props {
  productId: string
  review: IProductReview
}

export const UpdateReviewForm = ({ review, productId }: Props) => {
  console.log(productId)
  const { showNotification } = useNotifications()
  const updateReview = useUpdateReview(productId)
  const { getFieldProps, setFieldValue, handleSubmit, values } = useFormik({
    initialValues: {
      review: review.review,
      rating: review.rating,
    },
    onSubmit: async values => {
      try {
        await updateReview.mutateAsync({
          reviewId: review.id,
          productId,
          ...values,
        })
        showNotification({
          title: 'Review Updated',
          message: 'Your review has been updated',
        })
      } catch (error: any) {
        showNotification({
          color: 'red',
          title: 'Update Review Failed',
          message: error.message,
        })
      }
    },
  })
  return (
    <form className='space-y-2' onSubmit={handleSubmit}>
      <Textarea label='Review' minRows={5} {...getFieldProps('review')} />
      <NumberInput
        label='Rating'
        max={5}
        min={1}
        onChange={rating => setFieldValue('rating', rating)}
        value={values.rating}
      />
      <Button fullWidth type='submit'>
        Confirm Update
      </Button>
    </form>
  )
}

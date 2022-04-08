import { ActionIcon, Button, NumberInput, Textarea } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { randNumber, randParagraph } from '@ngneat/falso'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import { useAddReview } from '@/hooks/review'

export const AddReviewForm = () => {
  const [showForm, setShowForm] = useState(false)
  const [review, setReview] = useState(randParagraph())
  const [rating, setRating] = useState(randNumber({ min: 0, max: 5 }))

  const { showNotification } = useNotifications()
  const router = useRouter()
  const formRef = useClickOutside(() => setShowForm(false))

  // since review can only be added from the product detail page, we can get the product id from the url
  const productId = router.query.id as string
  const addProductReview = useAddReview(productId)

  const handleAddReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await addProductReview.mutateAsync({
        productId,
        review,
        rating,
      })
      showNotification({
        title: 'Review Added',
        message: 'Your review has been added',
      })
    } catch (error: any) {
      setRating(0)
      setReview('')
      setShowForm(false)
      showNotification({
        color: 'red',
        title: 'Add Review Failed',
        message: error.message,
      })
    }
  }
  return (
    <form
      className='mb-4 space-y-2 rounded-md bg-gray-600 px-4 py-2 lg:max-w-md'
      onSubmit={handleAddReview}
      ref={formRef}
    >
      <div
        className='flex justify-between'
        onClick={() => setShowForm(currentValue => !currentValue)}
      >
        <h3 className='heading-tertiary'>Leave a review</h3>
        <ActionIcon>
          {showForm ? <BsChevronUp /> : <BsChevronDown />}
        </ActionIcon>
      </div>
      {showForm && (
        <div className='space-y-2'>
          <NumberInput
            max={5}
            min={0}
            onChange={value => setRating(value ?? 0)}
            placeholder='How much would you rate this product ?'
            value={rating}
          />
          <Textarea
            minRows={5}
            onChange={event => setReview(event.currentTarget.value)}
            placeholder='Write your review here'
            value={review}
          />
          <Button loading={addProductReview.isLoading} type='submit'>
            Add Review
          </Button>
        </div>
      )}
    </form>
  )
}

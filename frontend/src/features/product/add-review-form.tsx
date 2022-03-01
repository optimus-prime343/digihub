import { ActionIcon, Button, NumberInput, Textarea, Title } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { randNumber, randParagraph } from '@ngneat/falso'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

import { useAddProductReview } from '@/hooks/product'

export const AddReviewForm = () => {
  const [showForm, setShowForm] = useState(false)
  const [review, setReview] = useState(randParagraph())
  const [rating, setRating] = useState(randNumber({ min: 0, max: 5 }))

  const { showNotification } = useNotifications()
  const router = useRouter()
  const addProductReview = useAddProductReview()
  const formRef = useClickOutside(() => setShowForm(false))

  const handleAddReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await addProductReview.mutateAsync({
        productId: router.query.id as string,
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
      className='mb-4 space-y-2 rounded-md bg-gray-600 px-4 py-2'
      onSubmit={handleAddReview}
      ref={formRef}
    >
      <div
        className='flex justify-between'
        onClick={() => setShowForm(currentValue => !currentValue)}
      >
        <Title order={4}>Leave a review</Title>
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
          <Button
            className='bg-indigo-600'
            loading={addProductReview.isLoading}
            type='submit'
          >
            Add Review
          </Button>
        </div>
      )}
    </form>
  )
}

import { useCallback } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

interface Props {
  rating: number
  size?: number
}

const RatingStars = ({ rating, size }: Props) => {
  const getRatingStars = useCallback(() => {
    const star = 'fill-yellow-600'
    const stars: JSX.Element[] = []
    for (let i = 0; i < 5; i++) {
      if (Math.floor(rating) > i) {
        stars.push(<BsStarFill className={star} key={i} size={size} />)
      } else if (rating - i >= 0.5) {
        stars.push(<BsStarHalf className={star} key={i} size={size} />)
      } else {
        stars.push(<BsStar className={star} key={i} size={size} />)
      }
    }
    return stars
  }, [rating, size])
  return <div className='flex gap-2'>{getRatingStars()}</div>
}
export default RatingStars

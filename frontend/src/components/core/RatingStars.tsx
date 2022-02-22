import { useCallback } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

interface Props {
  rating: number
}

const RatingStars = ({ rating }: Props) => {
  const getRatingStars = useCallback(() => {
    const star = 'fill-yellow-600'
    const stars: JSX.Element[] = []
    for (let i = 0; i < 5; i++) {
      if (Math.floor(rating) > i) {
        stars.push(<BsStarFill className={star} key={i} />)
      } else if (rating - i >= 0.5) {
        stars.push(<BsStarHalf className={star} key={i} />)
      } else {
        stars.push(<BsStar className={star} key={i} />)
      }
    }
    return stars
  }, [rating])
  return <div className='flex gap-2'>{getRatingStars()}</div>
}
export default RatingStars

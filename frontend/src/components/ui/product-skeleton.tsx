import { Skeleton } from '@mantine/core'

interface Props {
  count?: number
}
export const ProductSkeleton = ({ count }: Props) => {
  const items = Array.from({ length: count ?? 4 }, (_, value) => value)
  const skeletons = items.map((_, index) => (
    <div className='space-y-2 rounded-md bg-gray-600 p-2' key={index}>
      <Skeleton height={300} width='100%' />
      <Skeleton height={20} width='70%' />
      <Skeleton height={25} width='50%' />
      <Skeleton height={20} width='50%' />
      <Skeleton />
    </div>
  ))
  return <>{skeletons}</>
}

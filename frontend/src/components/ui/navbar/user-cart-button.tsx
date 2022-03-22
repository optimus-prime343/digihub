import { useCarts } from '@/hooks/cart'

export const UserCartButton = () => {
  const { data } = useCarts()
  return (
    <div className='inline-flex items-center gap-2'>
      {data.length > 0 && (
        <span className='inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-black'>
          {data.length}
        </span>
      )}
      <span className='text-sm'>Cart</span>
    </div>
  )
}

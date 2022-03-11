import { FC } from 'react'
import { ClipLoader } from 'react-spinners'

interface Props {
  message?: string
}

export const FullPageLoader: FC<Props> = ({ message }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900'>
      <div className='flex flex-col items-center gap-4'>
        <ClipLoader color='#6d5eff' size={150} />
        <p className='text-xl font-medium'>{message ?? 'Loading...'}</p>
      </div>
    </div>
  )
}

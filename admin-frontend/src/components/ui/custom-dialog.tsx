import { Dialog, Transition } from '@headlessui/react'
import { Fragment, HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}
export const CustomDialog = ({ title, open, onClose, children }: Props) => {
  return (
    <Transition
      show={open}
      enter='transition duration-300 ease-out'
      enterFrom='scale-95 opacity-0'
      enterTo='scale-100 opacity-100'
      leave='transition duration-100 ease-in'
      leaveFrom='scale-100 opacity-100'
      leaveTo='scale-95 opacity-0'
      as={Fragment}
    >
      <Dialog
        open={open}
        onClose={onClose}
        className='fixed inset-0 z-10 overflow-y-hidden'
      >
        <div className='flex min-h-screen items-center justify-center'>
          <Dialog.Overlay className='fixed inset-0 bg-black/30' />
          <div className='max-w-lg rounded-md bg-gray-800 p-4 shadow-md'>
            <Dialog.Title>{title}</Dialog.Title>
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

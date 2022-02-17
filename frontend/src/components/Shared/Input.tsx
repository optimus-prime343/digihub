import { FC, InputHTMLAttributes } from 'react'

export interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Input: FC<InputProperties> = ({ error, label, ...rest }) => {
  return (
    <div>
      {label && (
        <label
          className='mb-2 block font-medium capitalize text-neutral-300'
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <input
        autoComplete='off'
        type='text'
        {...rest}
        className={`input w-full ${error && 'input--error'}`}
      />
      {error && <p className='mt-2 text-red-400'>{error}</p>}
    </div>
  )
}

export default Input

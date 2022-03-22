import { useMutation } from 'react-query'

import { createAdmin } from '../services/auth-service'

export const useCreateAdmin = () => {
  return useMutation<string, Error, Record<string, FormDataEntryValue>>(formData =>
    createAdmin(formData)
  )
}

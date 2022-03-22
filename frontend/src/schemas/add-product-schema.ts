import * as Yup from 'yup'

export const addProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required().min(10),
  price: Yup.number().positive('Price must be positive').min(100).required(),
  quantity: Yup.number()
    .positive('Quantity must be positive')
    .min(1)
    .required(),
  tags: Yup.string().required(),
})

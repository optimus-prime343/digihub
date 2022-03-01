import { Merchant } from '../../merchants/entity/merchant.entity'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

export interface ICreateOrder {
    user: User
    product: Product
    merchant: Merchant
    quantity: number
    totalPrice: number
}

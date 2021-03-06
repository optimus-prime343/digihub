import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { OrderStatus } from '../../common/types/order-status.enum'
import { Merchant } from '../../merchants/entity/merchant.entity'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @ManyToOne(() => User, user => user.orders)
    public user: User

    @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
    @JoinTable()
    public product: Product

    @ManyToOne(() => Merchant, merchant => merchant.orders)
    public merchant: Merchant

    @Column({ default: 1 })
    public quantity: number

    @Column()
    public totalPrice: number

    @Column({ type: Date, default: new Date() })
    public createdAt: Date

    @Column({ default: OrderStatus.PENDING })
    public orderStatus: OrderStatus
}

import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { MerchantStatus } from '../../common/types'
import { Order } from '../../orders/entities/order.entity'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({ unique: true })
    public businessName: string

    @Column()
    public businessDescription: string

    @Column()
    public address: string

    @Column({ unique: true })
    public phoneNumber: string

    @Column({ enum: MerchantStatus, default: MerchantStatus.PENDING })
    public status: MerchantStatus

    @Column({ default: 0 })
    public netIncome: number

    @Column({ default: 0 })
    public withDrawAmount: number

    @Column({ default: 0 })
    public pendingAmount: number

    @Column({ type: Date, nullable: true })
    public lastWithDrawDate: Date | null

    @OneToOne(() => User, user => user.merchant)
    public user: User

    @OneToMany(() => Order, order => order.merchant, {
        cascade: true,
    })
    public orders: Order[]

    @OneToMany(() => Product, product => product.merchant, {
        cascade: true,
    })
    public products: Product[]
}

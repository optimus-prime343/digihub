import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @ManyToOne(() => User, user => user.carts, { onDelete: 'CASCADE' })
    public user: User

    @ManyToOne(() => Product, { onDelete: 'SET NULL' })
    public product: Product

    @Column({ default: 1 })
    public quantity: number
}

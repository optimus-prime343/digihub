import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    review: string

    @Column({ type: 'float' })
    rating: number

    @Column({ type: Date, default: new Date() })
    createdAt: Date

    @ManyToOne(() => Product, product => product.reviews, {
        onDelete: 'CASCADE',
    })
    product: Product

    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    @JoinTable()
    user: User
}

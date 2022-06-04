import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import { Merchant } from '../../merchants/entity/merchant.entity'
import { Review } from '../../reviews/entities/review.entity'

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ type: 'text' })
    description: string

    @Column()
    price: number

    @Column()
    quantity: number

    @Column()
    coverImage: string

    @Column({ default: 0 })
    totalRatings: number

    @Column({ default: 0 })
    averageRating: number

    @Column({ default: false })
    featured: boolean

    @ManyToOne(() => Merchant, merchant => merchant.products)
    merchant: Merchant

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ type: 'simple-array', default: [] })
    tags: string[]

    @OneToMany(() => Review, review => review.product, {
        eager: true,
    })
    reviews: Review[]
}

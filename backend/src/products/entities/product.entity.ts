import {
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
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

    @ManyToOne(() => Merchant, merchant => merchant.products)
    merchant: Merchant

    @Column({ type: Date, default: new Date() })
    createdAt: Date

    @Column({ type: Date, nullable: true })
    updatedAt: Date

    @Column({ type: 'simple-array', default: [] })
    tags: string[]

    @OneToMany(() => Review, review => review.product, {
        eager: true,
    })
    reviews: Review[]

    @BeforeUpdate()
    updateTimestamp(): void {
        this.updatedAt = new Date()
    }
}

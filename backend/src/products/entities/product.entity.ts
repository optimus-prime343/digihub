import {
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Merchant } from '../../merchants/entity/merchant.entity'
import { Category } from './category.entity'

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

    @Column({ type: 'simple-array' })
    images: string[]

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

    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    categories: Category[]

    @BeforeUpdate()
    updateTimestamp(): void {
        this.updatedAt = new Date()
    }
}

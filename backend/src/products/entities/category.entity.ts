import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Product } from './product.entity'

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(() => Product, product => product.categories)
    products: Product[]
}

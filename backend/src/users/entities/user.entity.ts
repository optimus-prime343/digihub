import { hash } from 'bcryptjs'
import { Exclude, instanceToPlain } from 'class-transformer'
import { pickBy } from 'lodash'
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Cart } from '../../carts/entities/cart.entity'
import { Role } from '../../common/types'
import { Merchant } from '../../merchants/entity/merchant.entity'
import { Order } from '../../orders/entities/order.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column()
    public firstName: string

    @Column()
    public lastName: string

    @Column({ unique: true })
    public email: string

    @Column({ unique: true })
    public username: string

    @Exclude({ toPlainOnly: true })
    @Column()
    public password: string

    @Exclude({ toPlainOnly: true })
    @Column({ type: 'text', nullable: true })
    public passwordConfirm: string | null

    @Column({ default: 'default.jpg' })
    public image: string

    @Column({ type: Date, nullable: true })
    public passwordChangedAt: Date | null

    @Column({ type: 'text', nullable: true })
    public passwordResetToken: string | null

    @Column({ type: 'text', nullable: true })
    public verificationCode: string | null

    @Column({ default: Role.USER })
    public role: Role

    @Column({ default: false })
    verified: boolean

    @OneToOne(() => Merchant, merchant => merchant.user, {
        eager: true,
        cascade: true,
        nullable: true,
    })
    @JoinColumn()
    public merchant: Merchant | null

    @OneToMany(() => Cart, cart => cart.user, {
        cascade: true,
    })
    public carts: Cart[]

    @OneToMany(() => Order, order => order.user, { cascade: true })
    public orders: Order[]

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await hash(this.password, 12)
        this.passwordConfirm = null
    }
    //overiding the default toJSON method
    toJSON(): Record<string, unknown> {
        /*
         This removes all the null values from the response body as well as the properties marked
         with @Exclude decorator
        */
        return pickBy(instanceToPlain(this), value => value)
    }
}

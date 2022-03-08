import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../users/entities/user.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

    @ManyToOne(() => User)
    author: User

    @Column({ type: Date, default: new Date() })
    createdAt: string
}
//add to contact

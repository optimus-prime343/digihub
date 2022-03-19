import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { User } from '../../users/entities/user.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, { eager: true })
    sender: User

    @Column()
    recipient: string

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date
}

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    title: string

    @Column()
    text: string

    @CreateDateColumn()
    createdAt: Date

    @Column()
    reportedBy: string

    @Column()
    reportedBusiness: string
}

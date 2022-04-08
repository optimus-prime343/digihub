import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../users/entities/user.entity'
import { SendMessageDto } from './dtos/send-message.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Message)
        private readonly messagesRepository: Repository<Message>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}
    async findUserById(id: string): Promise<User> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.merchant', 'merchant')
            .where('user.id = :id', { id })
            .orWhere('user.merchant = :id')
            .setParameters({ id })
            .getOne()
        if (!user) throw new NotFoundException(`User with id ${id} not found`)
        return user
    }
    async sendMessage(
        sendMessageDto: SendMessageDto,
        user: User
    ): Promise<Message> {
        const { content, recipient } = sendMessageDto
        const recipientUser = await this.findUserById(recipient)
        const message = this.messagesRepository.create({
            sender: user,
            recipient: recipientUser.id,
            content,
        })
        await this.messagesRepository.save(message)
        return message
    }
    async findMessages(
        senderId: string,
        recipientId: string
    ): Promise<Message[]> {
        const recipientUser = await this.findUserById(recipientId)
        return this.messagesRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'sender')
            .where(
                'message.sender = :senderId AND message.recipient = :recipientId'
            )
            .orWhere(
                'message.sender = :recipientId AND message.recipient = :senderId'
            )
            .setParameters({ senderId, recipientId: recipientUser.id })
            .getMany()
    }
    async findUserContacts(user: User): Promise<any> {
        const messages = await this.messagesRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'sender')
            .where('message.sender = :userId OR message.recipient = :userId')
            .distinctOn(['message.recipient'])
            .setParameters({ userId: user.id })
            .getMany()
        return (
            messages
                // .filter(message => message.sender.id !== user.id)
                .map(message => ({
                    recipientId: message.sender.id,
                    username: message.sender.username,
                    image: message.sender.image,
                }))
        )
    }
}

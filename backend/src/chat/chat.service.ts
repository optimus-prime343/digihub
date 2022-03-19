import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '../users/entities/user.entity'
import { FindMessagesDto } from './dtos/find-messages.dto'
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
    async findRecipient(id: string): Promise<User> {
        const recipientUser = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.id = :id')
            .orWhere('user.merchant = :id')
            .setParameters({ id })
            .getOne()
        if (!recipientUser)
            throw new NotFoundException(
                'The user you are trying to message doesn"t exist'
            )
        return recipientUser
    }
    async sendMessage(
        user: User,
        sendMessageDto: SendMessageDto
    ): Promise<Message> {
        const { content, recipient } = sendMessageDto
        const recipientUser = await this.findRecipient(recipient)
        const newMessage = this.messagesRepository.create({
            sender: user,
            recipient: recipientUser.id,
            content,
        })
        await this.messagesRepository.save(newMessage)
        return newMessage
    }
    async findAllMessages(
        user: User,
        findMessagesDto: FindMessagesDto
    ): Promise<Message[]> {
        const { recipient } = findMessagesDto
        const recipientUser = await this.findRecipient(recipient)
        return this.messagesRepository.find({
            where: {
                sender: user,
                recipient: recipientUser.id,
            },
        })
    }
    async findLastMessage(
        user: User,
        recipient: string
    ): Promise<Message | undefined> {
        return this.messagesRepository.findOne({
            where: { sender: user, recipient },
            order: { createdAt: 'DESC' },
        })
    }
    async findContacts(user: User): Promise<any> {
        // find all the messages sent by the user
        const userMessages = await this.messagesRepository
            .createQueryBuilder('message')
            .where('message.sender = :userId')
            .orWhere('message.recipient = :userId')
            .setParameters({ userId: user.id })
            .getMany()
        // select distinct recipient from userMessages
        const messageRecipients = [
            ...new Set(userMessages.map(message => message.recipient)),
        ]
        return Promise.all(
            messageRecipients.map(async messageRecipient => {
                // find the last message sent to the recipient
                const lastMessage = await this.findLastMessage(
                    user,
                    messageRecipient
                )
                const recipient = await this.findRecipient(messageRecipient)
                if (!lastMessage) throw new NotFoundException('No messages')
                return {
                    id: messageRecipient,
                    username: recipient.username,
                    image: recipient.image,
                    lastMessage: lastMessage.content,
                    lastMessageDate: lastMessage.createdAt,
                }
            })
        )
    }
}

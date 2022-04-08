import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { User } from '../../users/entities/user.entity'
import { ChatService } from '../chat.service'
import { SendMessageDto } from '../dtos/send-message.dto'

interface Message extends SendMessageDto {
    sender: User
}

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
        methods: ['GET', 'POST'],
    },
})
export class ChatGateway {
    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('message')
    async handleMessage(
        @MessageBody() sendMessageDto: Message,
        @ConnectedSocket() client: Socket
    ): Promise<void> {
        const { sender, content, recipient } = sendMessageDto
        await this.chatService.sendMessage({ content, recipient }, sender)
        client.broadcast.emit('message', sendMessageDto)
    }
}

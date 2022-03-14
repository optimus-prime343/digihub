import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

import { CreateMessageDto } from '../dtos/create-message.dto'

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true,
        methods: ['GET', 'POST'],
    },
})
export class ChatGateway {
    @SubscribeMessage('message')
    handleMessage(
        @MessageBody() createMessageDto: CreateMessageDto,
        @ConnectedSocket() client: Socket
    ): void {
        client.broadcast.emit('message', createMessageDto)
    }
}

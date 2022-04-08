import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { GetUser } from '../decorators/get-user.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { User } from '../users/entities/user.entity'
import { ChatService } from './chat.service'
import { Message } from './entities/message.entity'

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('messages/:recipientId')
    findMessages(
        @GetUser() user: User,
        @Param('recipientId') recipientId: string
    ): Promise<Message[]> {
        return this.chatService.findMessages(user.id, recipientId)
    }

    @Get('contacts')
    findUserContacts(@GetUser() user: User): Promise<any> {
        return this.chatService.findUserContacts(user)
    }
}

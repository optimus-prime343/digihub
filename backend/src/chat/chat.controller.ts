import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { GetUser } from '../decorators/get-user.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { User } from '../users/entities/user.entity'
import { ChatService } from './chat.service'
import { FindMessagesDto } from './dtos/find-messages.dto'
import { Message } from './entities/message.entity'

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('messages/:recipient')
    findAllMessages(
        @GetUser() user: User,
        @Param() findMessagesDto: FindMessagesDto
    ): Promise<Message[]> {
        return this.chatService.findAllMessages(user, findMessagesDto)
    }
    @Get('contacts')
    findContacts(@GetUser() user: User): Promise<any> {
        return this.chatService.findContacts(user)
    }
}

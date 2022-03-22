import { Controller, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {}

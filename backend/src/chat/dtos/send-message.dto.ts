import { IsNotEmpty, IsUUID } from 'class-validator'

export class SendMessageDto {
    @IsUUID()
    recipient: string

    @IsNotEmpty()
    content: string
}

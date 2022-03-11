import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateMessageDto {
    @IsNotEmpty()
    text: string

    @IsUUID()
    receiverId: string
}

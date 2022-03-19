import { IsUUID } from 'class-validator'

export class FindMessagesDto {
    @IsUUID()
    recipient: string
}

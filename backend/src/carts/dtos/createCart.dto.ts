import { IsUUID } from 'class-validator'

export class CreateCartDto {
    @IsUUID()
    productId: string
}

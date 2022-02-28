import { IsNumber, IsOptional, IsUUID } from 'class-validator'

export class CreateCartDto {
    @IsUUID()
    productId: string

    @IsOptional()
    @IsNumber()
    quantity?: number
}

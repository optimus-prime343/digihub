import { IsUUID, Max, Min } from 'class-validator'

export class CreateOrderDto {
    @IsUUID()
    public productId: string

    @Min(1)
    @Max(20)
    public quantity: number
}

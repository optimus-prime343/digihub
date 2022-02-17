import { IsUUID, Max, Min } from 'class-validator'

export class CreateOrderDto {
    @IsUUID()
    public productId: string

    @Min(0)
    @Max(10)
    public quantity: number
}

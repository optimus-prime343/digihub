import { IsNumber, Max, Min } from 'class-validator'

export class UpdateCartDto {
    @IsNumber()
    @Min(1)
    @Max(20)
    quantity: number
}

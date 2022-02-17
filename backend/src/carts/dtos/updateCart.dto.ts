import { IsNumber, Max, Min } from 'class-validator'

export class UpdateCartDto {
    @IsNumber()
    @Min(1)
    @Max(10)
    quantity: number
}

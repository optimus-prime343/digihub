import { IsNumber, Min } from 'class-validator'

export class CheckoutDto {
    @IsNumber()
    @Min(1)
    quantity: number
}

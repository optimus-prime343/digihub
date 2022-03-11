import { IsNumber, IsOptional, Length, Min, MinLength } from 'class-validator'

export class UpdateProductDto {
    @IsOptional()
    @Length(5, 50)
    name?: string

    @IsOptional()
    @MinLength(15)
    description?: string

    @IsOptional()
    @Min(1)
    price?: number

    @IsNumber()
    @Min(1)
    quantity?: number
}

import { IsOptional, Length, Min } from 'class-validator'

export class UpdateProductDto {
    @IsOptional()
    @Length(5, 30)
    name?: string

    @IsOptional()
    @Length(10, 350)
    description?: string

    @IsOptional()
    @Min(1)
    price?: number
}

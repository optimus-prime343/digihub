import { IsOptional } from 'class-validator'

export class FilterProductsDto {
    @IsOptional()
    page?: string

    @IsOptional()
    limit?: string
}

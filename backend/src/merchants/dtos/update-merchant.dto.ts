import { IsOptional, Length } from 'class-validator'

export class UpdateMerchantDto {
    @IsOptional()
    @Length(4, 40)
    businessName?: string

    @IsOptional()
    @Length(6, 30)
    address?: string

    @IsOptional()
    @Length(15, 400)
    businessDescription: string
}

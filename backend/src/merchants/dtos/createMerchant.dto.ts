import { IsPhoneNumber, IsString, Length } from 'class-validator'

export class CreateMerchantDto {
    @IsString()
    @Length(4, 30)
    businessName: string

    @IsString()
    @Length(10, 200)
    businessDescription: string

    @IsString()
    @Length(4, 30)
    address: string

    @IsString()
    @IsPhoneNumber('NP')
    phoneNumber: string
}

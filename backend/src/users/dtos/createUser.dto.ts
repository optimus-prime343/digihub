import { Type } from 'class-transformer'
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator'

import { PASSWORD_REGEX, PASSWORD_WEAK_MESSAGE } from '../../constants'
import { CreateMerchantDto } from '../../merchants/dtos/createMerchant.dto'

export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    firstName: string

    @IsString()
    @Length(4, 20)
    lastName: string

    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsString()
    @Matches(PASSWORD_REGEX, {
        message: PASSWORD_WEAK_MESSAGE.join('\n'),
    })
    password: string

    @IsString()
    passwordConfirm: string

    @IsOptional()
    @Type(() => CreateMerchantDto)
    merchant?: CreateMerchantDto

    @IsOptional()
    adminPassword?: string
}

import { IsEmail, IsOptional, Length } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @Length(4, 20)
    firstName?: string

    @IsOptional()
    @Length(4, 20)
    lastName?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @Length(4, 20)
    username?: string
}

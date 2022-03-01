import { IsString, Matches } from 'class-validator'

import { PASSWORD_REGEX } from '../../constants'

export class ResetPasswordDto {
    @IsString()
    @Matches(PASSWORD_REGEX)
    password: string

    @IsString()
    passwordConfirm: string
}

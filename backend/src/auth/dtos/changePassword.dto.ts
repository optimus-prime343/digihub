import { IsString, Matches } from 'class-validator'

import { PASSWORD_REGEX } from '../../constants'

export class ChangePasswordDto {
    @IsString()
    currentPassword: string

    @IsString()
    @Matches(PASSWORD_REGEX, {
        message:
            'Password must be at least 8 characters long and contain at least one number,one symbol, one uppercase letter and one lowercase letter',
    })
    newPassword: string

    @IsString()
    confirmNewPassword: string
}

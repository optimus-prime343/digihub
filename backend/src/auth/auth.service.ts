import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { compare } from 'bcryptjs'

import { Role } from '../common/types'
import { CreateUserDto } from '../users/dtos/createUser.dto'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { AuthCredentialsDto } from './dtos/authCredentials.dto'
import { ChangePasswordDto } from './dtos/changePassword.dto'
import { ResetPasswordDto } from './dtos/resetPassword.dto'

@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService')
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailerService
    ) {}

    public async signup(createUserDto: CreateUserDto): Promise<string> {
        const user = await this.usersService.createUser(createUserDto)
        //send an email with the verification token to verify the account
        await this.mailService.sendMail({
            to: user.email,
            subject: 'Welcome to Digihub',
            template: 'welcome',
            context: {
                fullName: `${user.firstName} ${user.lastName}`,
                token: user.verificationCode,
                merchantMessage:
                    user.role === Role.MERCHANT
                        ? 'Note: You must be approved by admin to start selling products'
                        : null,
            },
        })
        this.logger.log(`User ${user.username} signed up as ${user.role}`)
        return 'Please check your email to verify your account'
    }
    public createAdmin(createUserDto: CreateUserDto): Promise<string> {
        return this.usersService.createAdmin(createUserDto)
    }
    public async login(
        authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto
        const user = await this.usersService.findUserByUsername(username)
        if (!(await compare(password, user.password))) {
            throw new UnauthorizedException('Username or password is incorrect')
        }
        if (!user.verified)
            throw new UnauthorizedException('Please verify your account')
        const accessToken = this.jwtService.sign({ id: user.id })
        return { accessToken }
    }
    public verifyAccount(verificationToken: string): Promise<string> {
        return this.usersService.verifyAccount(verificationToken)
    }
    public async requestPasswordReset(email: string): Promise<string> {
        if (!email) throw new UnauthorizedException('Email is required')
        const resetToken = await this.usersService.setPasswordResetToken(email)
        await this.mailService.sendMail({
            to: email,
            subject: 'Password reset',
            template: 'requestPasswordReset',
            context: {
                token: resetToken,
            },
        })
        return 'Please check your email for password reset instructions'
    }
    public resetPassword(
        resetToken: string,
        resetPasswordDto: ResetPasswordDto
    ): Promise<string> {
        if (!resetToken)
            throw new UnauthorizedException('Reset token is required')
        return this.usersService.resetPassword(resetToken, resetPasswordDto)
    }
    public async changePassword(
        user: User,
        changePasswordDto: ChangePasswordDto
    ): Promise<string> {
        const { currentPassword, newPassword, confirmNewPassword } =
            changePasswordDto
        if (!(await compare(currentPassword, user.password)))
            throw new UnauthorizedException('Current password is incorrect')
        if (newPassword === currentPassword) {
            throw new UnauthorizedException(
                'New password cannot be the same as the current password'
            )
        }
        if (newPassword !== confirmNewPassword)
            throw new UnauthorizedException(
                'Password and passwordConfirm do not match'
            )
        return this.usersService.changePassword(user, newPassword)
    }
}

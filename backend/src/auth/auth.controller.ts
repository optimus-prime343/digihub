import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Redirect,
    Res,
    UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { COOKIE_EXPIRATION_DATE } from '../constants'
import { GetUser } from '../decorators/getUser.decorator'
import { JwtAuthGuard } from '../guards/jwtAuth.guard'
import { CreateUserDto } from '../users/dtos/createUser.dto'
import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dtos/authCredentials.dto'
import { ChangePasswordDto } from './dtos/changePassword.dto'
import { ResetPasswordDto } from './dtos/resetPassword.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    public signup(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.authService.signup(createUserDto)
    }

    @Post('create-admin')
    public createAdmin(@Body() createAdminDto: CreateUserDto): Promise<string> {
        return this.authService.createAdmin(createAdminDto)
    }

    @Post('login')
    public async login(
        @Res({ passthrough: true }) response: Response,
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        const jwtPayload = await this.authService.login(authCredentialsDto)
        response.cookie('accessToken', jwtPayload.accessToken, {
            httpOnly: true,
            expires: COOKIE_EXPIRATION_DATE,
            secure: process.env.NODE_ENV === 'production',
        })
        return jwtPayload
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    public logout(@Res({ passthrough: true }) response: Response): string {
        response.clearCookie('accessToken')
        return `Successfully logged out`
    }

    @Get('verify-account/:verificationCode')
    @Redirect('http://localhost:3000/auth/login')
    public verifyAccount(
        @Param('verificationCode') verificationCode: string
    ): Promise<string> {
        return this.authService.verifyAccount(verificationCode)
    }

    @Post('request-password-reset')
    public requestPasswordReset(@Body('email') email: string): Promise<string> {
        return this.authService.requestPasswordReset(email)
    }

    @Patch('reset-password/:resetToken')
    public resetPassword(
        @Param('resetToken') resetToken: string,
        @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<string> {
        return this.authService.resetPassword(resetToken, resetPasswordDto)
    }

    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    public changePassword(
        @GetUser() user: User,
        @Body() changePasswordDto: ChangePasswordDto
    ): Promise<string> {
        return this.authService.changePassword(user, changePasswordDto)
    }
}

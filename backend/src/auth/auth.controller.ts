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

import { GetUser } from '../decorators/get-user.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dtos/auth-credentials.dto'
import { ChangePasswordDto } from './dtos/change-password.dto'
import { ResetPasswordDto } from './dtos/reset-password.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    public signup(@Body() createUserDto: CreateUserDto): Promise<string> {
        return this.authService.signup(createUserDto)
    }

    @Post('login')
    public login(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        return this.authService.login(authCredentialsDto)
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

/* eslint-disable unicorn/no-null */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'

import { User } from '../../users/entities/user.entity'
import { JwtPayload } from '../interfaces/jwtPayload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJwtFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { id, iat } = payload
        const user = await this.userRepository.findOne(id)
        if (!user) throw new UnauthorizedException('You must be logged in')
        if (
            user.passwordChangedAt &&
            user.passwordChangedAt.getTime() / 1000 > iat
        ) {
            throw new UnauthorizedException(
                'Password has been changed recently.Please login with your new credentials'
            )
        }
        return user
    }
    private static extractJwtFromCookie(request: Request): string | null {
        if (request.cookies && request.cookies.accessToken) {
            return request.cookies.accessToken
        }
        return null
    }
}

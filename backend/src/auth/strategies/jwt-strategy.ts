import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'

import { MerchantStatus, Role } from '../../common/types'
import { User } from '../../users/entities/user.entity'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { id, iat } = payload
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new UnauthorizedException('You must be logged in')
        if (
            user.passwordChangedAt &&
            user.passwordChangedAt.getTime() / 1000 > iat
        ) {
            throw new UnauthorizedException(
                'Password has been changed recently.Please login with your new credentials'
            )
        }
        if (
            user.role === Role.MERCHANT &&
            user.merchant?.status === MerchantStatus.BLOCKED
        ) {
            throw new UnauthorizedException(
                'You have been blocked from using this service.Please contact admin for more details'
            )
        }
        return user
    }
}

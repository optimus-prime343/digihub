import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nestjs-modules/mailer'
import { Repository } from 'typeorm'

import { Role } from '../common/types'
import { PASSWORD_DONOT_MATCH_MESSAGE } from '../constants'
import { UpdateMerchanStatusDto } from '../merchants/dtos/update-merchant-status.dto'
import { Merchant } from '../merchants/entity/merchant.entity'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService: MailerService,
        private readonly configService: ConfigService
    ) {}
    public async updateMerchantStatus(
        updateMerchantStatusDto: UpdateMerchanStatusDto
    ): Promise<string> {
        const { status, merchantId } = updateMerchantStatusDto
        const merchant = await this.merchantRepository.findOne({
            where: { id: merchantId },
            relations: ['user'],
        })
        if (!merchant) throw new NotFoundException('Merchant not found')
        merchant.status = status
        await this.merchantRepository.save(merchant)
        await this.mailService.sendMail({
            to: merchant.user.email,
            subject: 'Merchant status updated',
            template: 'merchantStatusUpdate',
            context: {
                fullName: `${merchant.user.firstName} ${merchant.user.lastName}`,
                status: status,
            },
        })
        return `Merchant status updated to ${status}`
    }

    public async createAdmin(createUserDto: CreateUserDto): Promise<string> {
        const {
            adminPassword,
            firstName,
            lastName,
            email,
            username,
            password,
            passwordConfirm,
        } = createUserDto
        if (password !== passwordConfirm) {
            throw new BadRequestException(PASSWORD_DONOT_MATCH_MESSAGE)
        }
        if (
            adminPassword &&
            this.configService.get('ADMIN_PASSWORD') === adminPassword
        ) {
            const adminUser = this.userRepository.create({
                firstName,
                lastName,
                email,
                username,
                password,
                verified: true,
                role: Role.ADMIN,
                verificationCode: null,
            })
            await this.userRepository.save(adminUser)
            return 'Admin user created successfully'
        }
        throw new UnauthorizedException(
            'You are not authorized to perform this action'
        )
    }
}

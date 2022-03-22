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
import { Order } from '../orders/entities/order.entity'
import { Product } from '../products/entities/product.entity'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
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
            'Invalid superuser password, please try again'
        )
    }
    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find({
            where: {
                role: Role.USER,
            },
        })
    }
    async findAllMerchants(): Promise<Merchant[]> {
        return this.merchantRepository.find({ relations: ['user'] })
    }
    async findAllOrders(): Promise<Order[]> {
        return this.ordersRepository.find({ relations: ['user', 'merchant'] })
    }
    async findAllProducts(): Promise<Product[]> {
        return this.productsRepository.find()
    }
}

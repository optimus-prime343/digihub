import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nestjs-modules/mailer'
import { compare, hash } from 'bcryptjs'
import { nanoid } from 'nanoid'
import { Repository } from 'typeorm'

import { ResetPasswordDto } from '../auth/dtos/resetPassword.dto'
import { Role } from '../common/types'
import { PASSWORD_DONOT_MATCH_MESSAGE } from '../constants'
import { UpdateMerchantDto } from '../merchants/dtos/updateMerchant.dto'
import { UpdateMerchanStatusDto } from '../merchants/dtos/updateMerchantStatus.dto'
import { Merchant } from '../merchants/entity/merchant.entity'
import { CreateUserDto } from './dtos/createUser.dto'
import { UpdateUserDto } from './dtos/updateUser.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        private readonly configService: ConfigService,
        private readonly mailService: MailerService
    ) {}
    public async findUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository.findOne({ username })
        if (!user) throw new NotFoundException('User not found')
        return user
    }
    public async findOne(id: number): Promise<User | undefined> {
        const user = await this.userRepository.findOne(id)
        if (!user) throw new NotFoundException('User not found')
        return user
    }
    public findAll(): Promise<User[]> {
        return this.userRepository.find({
            relations: ['merchant'],
        })
    }

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                passwordConfirm,
                username,
                merchant,
            } = createUserDto
            if (password !== passwordConfirm) {
                throw new BadRequestException(PASSWORD_DONOT_MATCH_MESSAGE)
            }
            const user = this.userRepository.create({
                firstName,
                lastName,
                username,
                email,
                password,
                verificationCode: nanoid(),
            })
            if (merchant) {
                const newMerchant = this.merchantRepository.create({
                    businessName: merchant.businessName,
                    businessDescription: merchant.businessDescription,
                    phoneNumber: merchant.phoneNumber,
                    address: merchant.address,
                })
                user.merchant = newMerchant
                user.role = Role.MERCHANT
                await this.merchantRepository.save(newMerchant)
            }
            await this.userRepository.save(user)
            return user
        } catch (error: any) {
            if (error.code === '23505') {
                throw new BadRequestException(
                    'Email or username already exists'
                )
            }
            throw new InternalServerErrorException()
        }
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

    public async verifyAccount(verificationCode: string): Promise<string> {
        const user = await this.userRepository.findOne({ verificationCode })
        if (!user)
            throw new NotFoundException(`Invalid or expired verification code`)
        user.verified = true
        user.verificationCode = null
        await this.userRepository.save(user)
        return `Account verified successfully`
    }

    public async setPasswordResetToken(email: string): Promise<string> {
        const user = await this.userRepository.findOne({ email })
        if (!user)
            throw new NotFoundException('User with that email doesn"t exist')
        const resetToken = nanoid()
        user.passwordResetToken = resetToken
        await this.userRepository.save(user)
        return resetToken
    }

    public async resetPassword(
        resetToken: string,
        resetPasswordDto: ResetPasswordDto
    ): Promise<string> {
        const { password, passwordConfirm } = resetPasswordDto
        const user = await this.userRepository.findOne({
            passwordResetToken: resetToken,
        })
        if (!user) throw new NotFoundException('Invalid or expired token')
        if (password !== passwordConfirm) {
            throw new BadRequestException(
                'Password and passwordConfirm do not match'
            )
        }
        if (await compare(password, user.password)) {
            throw new BadRequestException(
                'New password must be different from old password'
            )
        }
        user.password = await hash(password, 12)
        user.passwordResetToken = null
        user.passwordChangedAt = new Date()
        await this.userRepository.save(user)

        return `Password changed successfully`
    }

    public async changePassword(
        user: User,
        newPassword: string
    ): Promise<string> {
        user.password = newPassword
        user.passwordChangedAt = new Date()
        await this.userRepository.save(user)
        return `Password changed successfully`
    }
    public async updateUser(
        user: User,
        updateUserDto: UpdateUserDto
    ): Promise<User | undefined> {
        const { firstName, lastName, email, username } = updateUserDto
        if (Object.keys(updateUserDto).length === 0) {
            throw new BadRequestException('No fields to update')
        }
        try {
            if (firstName) user.firstName = firstName
            if (lastName) user.lastName = lastName
            if (email) user.email = email
            if (username) user.username = username
            await this.userRepository.save(user)
            console.log(`User is ${JSON.stringify(user, undefined, 4)}`)
            return user
        } catch (error: any) {
            if (error.code === '23505')
                throw new ConflictException('Email or username already taken')
            throw new InternalServerErrorException()
        }
    }
    public async updateMerchant(
        merchant: Merchant,
        updateMerchantDto: UpdateMerchantDto
    ): Promise<User | undefined> {
        if (Object.keys(updateMerchantDto).length === 0) {
            throw new BadRequestException('No fields to update')
        }
        const { businessName, businessDescription, address } = updateMerchantDto

        if (businessName) merchant.businessName = businessName
        if (businessDescription)
            merchant.businessDescription = businessDescription
        if (address) merchant.address = address

        await this.merchantRepository.save(merchant)
        return this.userRepository.findOne({ merchant })
    }
    public async updateMerchantStatus(
        merchantId: string,
        updateMerchantStatusDto: UpdateMerchanStatusDto
    ): Promise<string> {
        const { status } = updateMerchantStatusDto
        const user = await this.userRepository.findOne({
            where: { merchant: merchantId },
        })
        if (!user || !user.merchant)
            throw new NotFoundException('Merchant not found')
        user.merchant.status = status
        await this.userRepository.save(user)
        await this.mailService.sendMail({
            to: user.email,
            subject: 'Merchant status updated',
            template: 'merchantStatusUpdate',
            context: {
                fullName: `${user.firstName} ${user.lastName}`,
                status: status,
            },
        })
        return `Merchant status updated to ${status}`
    }
    public async updateProfileImage(
        user: User,
        imagePath: string
    ): Promise<string> {
        user.image = imagePath
        await this.userRepository.save(user)
        return `Profile image updated successfully`
    }
}

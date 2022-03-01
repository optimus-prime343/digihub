import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nestjs-modules/mailer'
import { Repository } from 'typeorm'

import { UpdateMerchanStatusDto } from '../merchants/dtos/update-merchant-status.dto'
import { Merchant } from '../merchants/entity/merchant.entity'

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        private readonly mailService: MailerService
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
}

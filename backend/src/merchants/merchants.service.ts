import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { add, differenceInBusinessDays, format } from 'date-fns'
import { Repository } from 'typeorm'

import { User } from '../users/entities/user.entity'
import { UpdateMerchantDto } from './dtos/updateMerchant.dto'
import { Merchant } from './entity/merchant.entity'

@Injectable()
export class MerchantsService {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
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
    public async withdraw(
        merchant: Merchant,
        amount: number
    ): Promise<Merchant> {
        if (amount > merchant.pendingAmount) {
            throw new BadRequestException('Insufficient funds')
        }
        if (
            merchant.lastWithDrawDate &&
            differenceInBusinessDays(new Date(), merchant.lastWithDrawDate) < 14
        ) {
            const nextWithdrawDate = format(
                add(merchant.lastWithDrawDate, {
                    days: 14,
                }),
                'PPP'
            )
            throw new BadRequestException(
                `You can withdraw once every 2 weeks.Next withdrawl date is ${nextWithdrawDate}`
            )
        }
        merchant.pendingAmount -= amount
        merchant.withDrawAmount = amount
        merchant.lastWithDrawDate = new Date()
        await this.merchantRepository.save(merchant)
        return merchant
    }
}

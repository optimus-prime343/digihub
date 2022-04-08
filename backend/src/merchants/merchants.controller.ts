import { Body, Controller, Patch, UseGuards } from '@nestjs/common'

import { Role } from '../common/types'
import { GetMerchant } from '../decorators/get-merchant.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { UpdateMerchantDto } from './dtos/update-merchant.dto'
import { Merchant } from './entity/merchant.entity'
import { MerchantsService } from './merchants.service'

@Controller('merchants')
@Roles(Role.MERCHANT)
@UseGuards(JwtAuthGuard, RolesGuard)
export class MerchantsController {
    constructor(private readonly merchantService: MerchantsService) {}

    @Patch()
    public updateMerchant(
        @GetMerchant() merchant: Merchant,
        @Body() updateMerchantDto: UpdateMerchantDto
    ): Promise<string> {
        return this.merchantService.updateMerchant(merchant, updateMerchantDto)
    }

    @Patch('withdraw-amount')
    public async withdraw(
        @GetMerchant() merchant: Merchant,
        @Body('amount') amount: number
    ): Promise<Merchant> {
        return this.merchantService.withdraw(merchant, amount)
    }
}

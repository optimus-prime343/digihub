import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../users/entities/user.entity'
import { Merchant } from './entity/merchant.entity'
import { MerchantsController } from './merchants.controller'
import { MerchantsService } from './merchants.service'

@Module({
    imports: [TypeOrmModule.forFeature([Merchant, User])],
    controllers: [MerchantsController],
    providers: [MerchantsService],
})
export class MerchantsModule {}

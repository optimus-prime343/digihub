import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Merchant } from '../merchants/entity/merchant.entity'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
    imports: [TypeOrmModule.forFeature([Merchant])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}

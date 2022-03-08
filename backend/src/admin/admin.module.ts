import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Merchant } from '../merchants/entity/merchant.entity'
import { User } from '../users/entities/user.entity'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
    imports: [TypeOrmModule.forFeature([Merchant, User]), ConfigModule],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}

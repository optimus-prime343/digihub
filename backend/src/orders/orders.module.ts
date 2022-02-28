import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Merchant } from '../merchants/entity/merchant.entity'
import { MerchantsModule } from '../merchants/merchants.module'
import { ProductsModule } from '../products/products.module'
import { User } from '../users/entities/user.entity'
import { UsersModule } from '../users/users.module'
import { Order } from './entities/order.entity'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, Merchant, User]),
        ProductsModule,
        UsersModule,
        MerchantsModule,
        ConfigModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}

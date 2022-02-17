import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProductsModule } from '../products/products.module'
import { CartsController } from './carts.controller'
import { CartsService } from './carts.service'
import { Cart } from './entities/cart.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Cart]), ProductsModule],
    controllers: [CartsController],
    providers: [CartsService],
})
export class CartsModule {}

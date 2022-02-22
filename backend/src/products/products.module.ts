import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from './entities/product.entity'
import { ProductsGateway } from './gateways/products.gateway'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProductsService, ProductsGateway],
    controllers: [ProductsController],
    exports: [ProductsService],
})
export class ProductsModule {}

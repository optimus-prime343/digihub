import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'
import { ProductsGateway } from './gateways/products.gateway'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    providers: [ProductsService, ProductsGateway],
    controllers: [ProductsController],
    exports: [ProductsService],
})
export class ProductsModule {}

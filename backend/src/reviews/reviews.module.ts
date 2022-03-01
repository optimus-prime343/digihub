import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from '../products/entities/product.entity'
import { User } from '../users/entities/user.entity'
import { Review } from './entities/review.entity'
import { ReviewsController } from './reviews.controller'
import { ReviewsService } from './reviews.service'

@Module({
    imports: [TypeOrmModule.forFeature([Review, Product, User])],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})
export class ReviewsModule {}

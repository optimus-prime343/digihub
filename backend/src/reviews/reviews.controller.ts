import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'

import { Role } from '../common/types'
import { GetUser } from '../decorators/get-user.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { User } from '../users/entities/user.entity'
import { CreateReviewDto } from './dto/create-review.dto'
import { Review } from './entities/review.entity'
import { ReviewsService } from './reviews.service'

@Roles(Role.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    create(
        @GetUser() user: User,
        @Body() createReviewDto: CreateReviewDto
    ): Promise<Review> {
        return this.reviewsService.create(user, createReviewDto)
    }

    @Get()
    findAll(@Body('productId') productId: string): Promise<Review[]> {
        return this.reviewsService.findAll(productId)
    }
    @Delete(':reviewId/:productId')
    remove(
        @GetUser() user: User,
        @Param('reviewId') reviewId: string,
        @Param('productId') productId: string
    ): Promise<string> {
        return this.reviewsService.remove(user, reviewId, productId)
    }

    @Patch(':reviewId/:productId')
    update(
        @GetUser() user: User,
        @Param('reviewId') reviewId: string,
        @Param('productId') productId: string,
        @Body() createReviewDto: CreateReviewDto
    ): Promise<Review> {
        console.log(productId, reviewId)
        return this.reviewsService.update(
            user,
            reviewId,
            productId,
            createReviewDto
        )
    }
}

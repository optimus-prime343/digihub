import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { OrderStatus } from '../common/types'
import { Product } from '../products/entities/product.entity'
import { User } from '../users/entities/user.entity'
import { CreateReviewDto } from './dto/create-review.dto'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewsRepository: Repository<Review>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    // check whether user has purchased the product before they can review it
    hasPurchasedProduct(user: User, productId: string): boolean {
        return user.orders
            .filter(order => order.orderStatus === OrderStatus.COMPLETED)
            .some(order => order.product.id === productId)
    }
    //check if user has already reviewed the product
    async hasAlreadyReviewed(user: User, product: Product): Promise<boolean> {
        const review = await this.reviewsRepository.findOne({
            where: { user, product },
        })
        return !!review
    }
    // create a new for a specific product
    async create(
        user: User,
        createReviewDto: CreateReviewDto
    ): Promise<Review> {
        const { productId, rating, review } = createReviewDto
        const product = await this.productRepository.findOne(productId)
        // since user object doesnt have order relations by default,we are querying the db again to get the orders
        const userWithOrders = await this.userRepository.findOne({
            where: { id: user.id },
            relations: ['orders'],
        })
        if (!userWithOrders) throw new ForbiddenException(`User doesnt exist`)
        if (!product)
            throw new NotFoundException(
                `The product you are trying to review does not exist or has been deleted`
            )
        if (!this.hasPurchasedProduct(userWithOrders, productId)) {
            throw new ForbiddenException(
                `You have to purchase the product before you can review it`
            )
        }
        if (await this.hasAlreadyReviewed(user, product)) {
            throw new ForbiddenException(
                `You have already reviewed this product`
            )
        }
        const newReview = this.reviewsRepository.create({
            rating,
            review,
            product,
            user,
        })
        product.totalRatings += 1
        product.averageRating =
            (product.averageRating * (product.totalRatings - 1) + rating) /
            product.totalRatings
        await this.productRepository.save(product)
        await this.reviewsRepository.save(newReview)
        return newReview
    }
    // find all reviews related to a specific product
    findAll(productId: string): Promise<Review[]> {
        return this.reviewsRepository.find({
            where: { product: { id: productId } },
        })
    }
    // remove review posted by a user for a specific product
    async remove(
        user: User,
        reviewId: string,
        productId: string
    ): Promise<string> {
        const review = await this.reviewsRepository.findOne({
            where: {
                id: reviewId,
                product: { id: productId },
                user,
            },
        })
        const product = await this.productRepository.findOne(productId)
        if (!product) throw new NotFoundException(`Product doesnt exist`)
        if (!review) throw new NotFoundException(`Review doesnt exist`)
        product.totalRatings -= 1
        product.averageRating =
            product.totalRatings > 0
                ? (product.averageRating * (product.totalRatings + 1) -
                      review.rating) /
                  product.totalRatings
                : 0
        await this.productRepository.save(product)
        await this.reviewsRepository.remove(review)
        return `Review with id ${reviewId} has been deleted`
    }
}

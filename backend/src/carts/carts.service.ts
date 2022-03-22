import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CART_NOT_FOUND } from '../constants'
import { ProductsService } from '../products/products.service'
import { User } from '../users/entities/user.entity'
import { CreateCartDto } from './dtos/create-cart.dto'
import { UpdateCartDto } from './dtos/update-cart.dto'
import { Cart } from './entities/cart.entity'

@Injectable()
export class CartsService {
    constructor(
        private readonly productService: ProductsService,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>
    ) {}
    // check whether the product is already in the cart
    public async cartAlreadyExists(
        user: User,
        productId: string
    ): Promise<boolean> {
        return (
            (await this.cartRepository.count({
                user,
                product: { id: productId },
            })) > 0
        )
    }
    public async create(
        user: User,
        createCartDto: CreateCartDto
    ): Promise<Cart> {
        const { productId, quantity } = createCartDto
        const product = await this.productService.findProductById(productId)
        if (!product) throw new NotFoundException('Product not found')
        if (await this.cartAlreadyExists(user, product.id))
            throw new BadRequestException('Product already in cart')
        const cart = this.cartRepository.create({
            product,
            user,
            quantity,
            totalPrice: (quantity ?? 1) * product.price,
        })
        await this.cartRepository.save(cart)
        return cart
    }

    public findAll(user: User): Promise<Cart[]> {
        return this.cartRepository.find({
            where: { user },
            relations: ['product'],
            order: { totalPrice: 'DESC' },
        })
    }

    public async findOne(user: User, id: string): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
            where: { user, id },
            relations: ['product'],
        })
        if (!cart) throw new NotFoundException(CART_NOT_FOUND)
        return cart
    }

    public async update(
        user: User,
        id: string,
        updateCartDto: UpdateCartDto
    ): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
            id,
            user,
        })
        if (!cart) throw new NotFoundException(CART_NOT_FOUND)
        cart.quantity = updateCartDto.quantity
        await this.cartRepository.save(cart)
        return cart
    }

    public async remove(user: User, id: string): Promise<string> {
        const result = await this.cartRepository.delete({ id, user })
        if (result.affected === 0) throw new NotFoundException(CART_NOT_FOUND)
        return 'Cart deleted successfully'
    }
}

import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { MerchantStatus } from '../common/types'
import { PRODUCT_NOT_FOUND_MESSAGE } from '../constants'
import { Merchant } from '../merchants/entity/merchant.entity'
import { CreateProductDto } from './dtos/createProduct.dto'
import { UpdateProductDto } from './dtos/updateProduct.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
    private readonly loggger = new Logger('ProductsService')
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}
    public async createProduct(
        merchant: Merchant,
        createProductDto: CreateProductDto
    ): Promise<Product> {
        const { description, images, name, price } = createProductDto
        if (merchant.status !== MerchantStatus.APPROVED) {
            throw new BadRequestException(
                'You must be approved to create a product'
            )
        }
        if (Number(price) < 0) {
            throw new BadRequestException('Price must be greater than 0')
        }
        const product = this.productRepository.create({
            name,
            description,
            price: Number(price),
            images,
            merchant,
        })
        this.loggger.log(`${merchant.businessName} created a new product`)
        await this.productRepository.save(product)
        return product
    }

    public findAllByMerchant(merchant: Merchant): Promise<Product[]> {
        this.loggger.log(`${merchant.businessName} fetching all their products`)
        return this.productRepository.find({
            where: { merchant },
        })
    }

    public findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['merchant'] })
    }

    public async findProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['merchant'],
        })
        if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE)
        return product
    }

    public async updateProduct(
        merchant: Merchant,
        productId: string,
        updateProductDto: UpdateProductDto
    ): Promise<Product> {
        if (Object.keys(updateProductDto).length === 0) {
            throw new BadRequestException('No fields to update')
        }
        const { description, name, price } = updateProductDto
        const product = await this.productRepository.findOne({
            where: {
                id: productId,
                merchant,
            },
            relations: ['merchant'],
        })
        if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE)
        if (description) product.description = description
        if (name) product.name = name
        if (price) product.price = price
        await this.productRepository.save(product)
        return product
    }

    public async deleteProduct(
        merchant: Merchant,
        productId: string
    ): Promise<string> {
        try {
            const product = await this.productRepository.delete({
                id: productId,
                merchant,
            })
            if (product.affected === 0) {
                throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE)
            }
            return 'Product deleted successfully'
        } catch (error: any) {
            // throw an error if merchant tries to delete a product associated with the pending orders
            if (error.code === '23503')
                throw new ConflictException(
                    `Please complete all orders associated with this product before deleting`
                )
            throw new InternalServerErrorException()
        }
    }
}

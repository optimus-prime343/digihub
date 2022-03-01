import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

import { MerchantStatus } from '../common/types'
import { PRODUCT_NOT_FOUND_MESSAGE } from '../constants'
import { Merchant } from '../merchants/entity/merchant.entity'
import { CreateProductDto } from './dtos/create-product.dto'
import { FilterProductsDto } from './dtos/filter-product.dto'
import { UpdateProductDto } from './dtos/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
    private readonly loggger = new Logger('ProductsService')
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}
    public async totalProductInDB(): Promise<number> {
        return this.productRepository.count()
    }
    public async createProduct(
        merchant: Merchant,
        createProductDto: CreateProductDto,
        coverImage: string
    ): Promise<Product> {
        try {
            const {
                description,
                name,
                price,
                quantity,
                tags: tagSeparatedByCommas,
            } = createProductDto
            if (merchant.status !== MerchantStatus.APPROVED) {
                throw new BadRequestException(
                    'You must be approved to create a product'
                )
            }
            if (Number(price) < 0) {
                throw new BadRequestException('Price must be greater than 0')
            }
            if (Number(quantity) < 0) {
                throw new BadRequestException('Quantity must be greater than 0')
            }

            const product = this.productRepository.create({
                name,
                description,
                price: Number(price),
                coverImage,
                merchant,
                quantity: Number(quantity),
                tags: tagSeparatedByCommas.split(','),
            })
            this.loggger.log(`${merchant.businessName} created a new product`)
            await this.productRepository.save(product)
            return product
        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }
    }

    public findAllByMerchant(merchant: Merchant): Promise<Product[]> {
        this.loggger.log(`${merchant.businessName} fetching all their products`)
        return this.productRepository.find({
            where: { merchant },
            order: { createdAt: 'DESC' },
        })
    }

    public findAll(filterProductDto: FilterProductsDto): Promise<Product[]> {
        const page = filterProductDto.page ? Number(filterProductDto.page) : 1
        const limit = filterProductDto.limit
            ? Number(filterProductDto.limit)
            : 10
        const skip = (page - 1) * limit
        return this.productRepository.find({
            relations: ['merchant'],
            take: limit,
            skip,
            order: { createdAt: 'DESC' },
        })
    }
    public async searchProducts(searchQuery: string): Promise<Product[]> {
        return this.productRepository.find({
            where: { name: ILike(`%${searchQuery}%`) },
            select: ['id', 'name', 'price', 'coverImage', 'description'],
        })
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
        const { description, name, price, quantity } = updateProductDto
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
        if (quantity) product.quantity = quantity
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

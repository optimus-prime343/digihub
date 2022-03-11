import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { Role } from '../common/types'
import { GetMerchant } from '../decorators/get-merchant.decorator'
import { GetUser } from '../decorators/get-user.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { resizeProductCoverImage } from '../helpers/resize-product-images'
import { Merchant } from '../merchants/entity/merchant.entity'
import { User } from '../users/entities/user.entity'
import { CreateProductDto } from './dtos/create-product.dto'
import { FilterProductsDto } from './dtos/filter-product.dto'
import { UpdateProductDto } from './dtos/update-product.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('count')
    public async getTotalProductsInDB(): Promise<number> {
        return this.productsService.totalProductInDB()
    }

    @Roles(Role.MERCHANT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('coverImage'))
    public async createProduct(
        @GetUser() user: User,
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() uploadedFile: Express.Multer.File
    ): Promise<Product> {
        const coverImage = await resizeProductCoverImage(uploadedFile)
        // this route can only be accessed by user registered as seller
        //so we can safely cast user to Merchant
        return this.productsService.createProduct(
            user.merchant as Merchant,
            createProductDto,
            coverImage
        )
    }

    @Roles(Role.MERCHANT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('me')
    public findAllByMerchant(
        @GetMerchant() merchant: Merchant
    ): Promise<Product[]> {
        return this.productsService.findAllByMerchant(merchant)
    }

    @Get()
    public findAll(
        @Query() filterProductDto: FilterProductsDto
    ): Promise<Product[]> {
        return this.productsService.findAll(filterProductDto)
    }
    @Get('search')
    public search(
        @Query('searchQuery') searchQuery: string
    ): Promise<Product[]> {
        return this.productsService.searchProducts(searchQuery)
    }
    @Get(':id')
    public findProductById(@Param('id') id: string): Promise<Product> {
        return this.productsService.findProductById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':productId')
    public updateProduct(
        @GetMerchant() merchant: Merchant,
        @Param('productId') productId: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        console.log(updateProductDto)
        return this.productsService.updateProduct(
            merchant,
            productId,
            updateProductDto
        )
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':productId')
    public deleteProduct(
        @GetMerchant() merchant: Merchant,
        @Param('productId') productId: string
    ): Promise<string> {
        return this.productsService.deleteProduct(merchant, productId)
    }
}

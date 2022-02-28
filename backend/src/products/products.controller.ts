import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

import { Role } from '../common/types'
import { GetMerchant } from '../decorators/getMerchant.decorator'
import { GetUser } from '../decorators/getUser.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwtAuth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { resizeProductImages } from '../helpers/resizeProductImages'
import { Merchant } from '../merchants/entity/merchant.entity'
import { User } from '../users/entities/user.entity'
import { CreateProductDto } from './dtos/createProduct.dto'
import { FilterProductsDto } from './dtos/filterProduct.dto'
import { UpdateProductDto } from './dtos/updateProduct.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Roles(Role.MERCHANT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('productImage', 4))
    public async createProduct(
        @GetUser() user: User,
        @Body() createProductDto: Omit<CreateProductDto, 'images'>,
        @UploadedFiles() uploadedImages: Express.Multer.File[]
    ): Promise<Product> {
        const images = await resizeProductImages(uploadedImages)
        // this route can only be accessed by user registered as seller
        //so we can safely cast user to Merchant
        return this.productsService.createProduct(user.merchant as Merchant, {
            ...createProductDto,
            images,
        })
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
        return this.productsService.SearchProducts(searchQuery)
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

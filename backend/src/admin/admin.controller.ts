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
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { UpdateMerchanStatusDto } from '../merchants/dtos/update-merchant-status.dto'
import { Merchant } from '../merchants/entity/merchant.entity'
import { Order } from '../orders/entities/order.entity'
import { Product } from '../products/entities/product.entity'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { User } from '../users/entities/user.entity'
import { AdminService } from './admin.service'

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Patch('/update-merchant-status/:merchantId/:status')
    public updateMerchantStatus(
        @Param() updateMerchantStatusDto: UpdateMerchanStatusDto
    ): Promise<string> {
        return this.adminService.updateMerchantStatus(updateMerchantStatusDto)
    }
    @Post()
    public createAdmin(@Body() createUserDto: CreateUserDto): Promise<string> {
        console.log('CREATE ADMIN DTO', createUserDto)
        return this.adminService.createAdmin(createUserDto)
    }
    @Get('users')
    public findAllUsers(): Promise<User[]> {
        return this.adminService.findAllUsers()
    }
    @Get('merchants')
    public findAllMerchants(): Promise<Merchant[]> {
        return this.adminService.findAllMerchants()
    }
    @Get('products')
    public findAllProducts(): Promise<Product[]> {
        return this.adminService.findAllProducts()
    }

    @Get('orders')
    public findAllOrders(): Promise<Order[]> {
        return this.adminService.findAllOrders()
    }
    @Patch('/update-product/:productId')
    public updateProduct(
        @Param('productId') productId: string,
        @Body() updateProductDto: Partial<Product>
    ): Promise<string> {
        return this.adminService.updateProduct(productId, updateProductDto)
    }

    @Delete('/delete-product/:productId')
    public deleteProduct(
        @Param('productId') productId: string
    ): Promise<string> {
        return this.adminService.deleteProduct(productId)
    }
}

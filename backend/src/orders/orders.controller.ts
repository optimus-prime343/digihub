import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common'

import { Role } from '../common/types'
import { GetMerchant } from '../decorators/getMerchant.decorator'
import { GetUser } from '../decorators/getUser.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwtAuth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Merchant } from '../merchants/entity/merchant.entity'
import { User } from '../users/entities/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'
import { UpdateOrderDto } from './dto/updateOrder.dto'
import { Order } from './entities/order.entity'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    public create(
        @GetUser() user: User,
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order> {
        return this.ordersService.create(user, createOrderDto)
    }

    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('user-orders')
    public findAllUserOrders(@GetUser() user: User): Promise<Order[]> {
        return this.ordersService.findAllUserOrders(user)
    }

    @Roles(Role.MERCHANT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('merchant-orders')
    public findAllMerchantOrders(
        @GetMerchant() merchant: Merchant
    ): Promise<Order[]> {
        return this.ordersService.findAllMerchantOrders(merchant)
    }

    @Roles(Role.MERCHANT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('update-order')
    public updateOrder(
        @GetMerchant() merchant: Merchant,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<Order> {
        return this.ordersService.updateOrder(merchant, updateOrderDto)
    }
}

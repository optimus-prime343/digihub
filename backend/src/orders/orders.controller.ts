import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import Stripe from 'stripe'

import { Role } from '../common/types'
import { GetMerchant } from '../decorators/get-merchant.decorator'
import { GetUser } from '../decorators/get-user.decorator'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Merchant } from '../merchants/entity/merchant.entity'
import { User } from '../users/entities/user.entity'
import { CheckoutDto } from './dto/checkout.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
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

    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('cancel-order')
    public async cancelOrder(
        @GetUser() user: User,
        @Body('orderId') orderId: string
    ): Promise<string> {
        return this.ordersService.cancelOrder(user, orderId)
    }

    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('checkout-session/:productId')
    public async createCheckoutSession(
        @Param('productId') productId: string,
        @Body() checkoutDto: CheckoutDto,
        @GetUser() user: User
    ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
        return this.ordersService.createCheckoutSession(
            productId,
            user,
            checkoutDto
        )
    }
    @Post('webhooks')
    public async webhookCheckout(
        @Req() request: Request,
        @Body() payload: string
    ): Promise<void> {
        const signature = request.headers['stripe-signature'] as string
        // console.log(payload, signature)
        return this.ordersService.webhookCheckout(payload, signature)
    }
}

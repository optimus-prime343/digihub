import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nestjs-modules/mailer'
import { Repository } from 'typeorm'

import { OrderStatus } from '../common/types'
import { ICreateOrder } from '../common/types/createOrder.interface'
import { Merchant } from '../merchants/entity/merchant.entity'
import { ProductsService } from '../products/products.service'
import { User } from '../users/entities/user.entity'
import { CreateOrderDto } from './dto/createOrder.dto'
import { UpdateOrderDto } from './dto/updateOrder.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name)
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        private readonly productService: ProductsService,
        private readonly mailService: MailerService
    ) {}

    /**
     Check whether the user has already ordered the product
    */
    public async orderAlreadyExists(
        user: User,
        productId: string
    ): Promise<boolean> {
        const order = await this.orderRepository.findOne({
            where: {
                user,
                product: { id: productId },
                orderStatus: OrderStatus.PENDING,
            },
        })
        return !!order
    }
    /**
     * Creates an order on both user and merchant side
     */
    public async create(
        user: User,
        createOrderDto: CreateOrderDto
    ): Promise<Order> {
        // add order on user as well as merchant side
        // get product from productid
        // get merchant selling the given product
        const { productId, quantity } = createOrderDto
        const product = await this.productService.findProductById(productId)
        if (await this.orderAlreadyExists(user, productId)) {
            throw new BadRequestException(
                'You have already ordered this product'
            )
        }
        const requiredData: ICreateOrder = {
            product,
            merchant: product.merchant,
            user,
            quantity,
            totalPrice: product.price * quantity,
        }
        this.logger.debug(JSON.stringify(requiredData, undefined, 4))
        const order = this.orderRepository.create(requiredData)
        await this.orderRepository.save(order)
        this.logger.log(`${user.username} created a order`)
        this.logger.log(`${product.merchant.businessName} received an order`)
        return order
    }

    /**
     *Get all the products owned by logged in user
     */
    public findAllUserOrders(user: User): Promise<Order[]> {
        this.logger.log(`Retrieving all the orders created by ${user.username}`)
        return this.orderRepository.find({
            where: { user },
            relations: ['product'],
        })
    }
    /**
     * Get all the orders received by a merchant
     */
    public async findAllMerchantOrders(merchant: Merchant): Promise<Order[]> {
        this.logger.log(
            `Retrieving all the orders received by ${merchant.businessName}`
        )
        return this.orderRepository.find({
            where: { product: { merchant } },
            relations: ['product', 'user'],
        })
    }
    /**
     * Update the status of the received order to (PENDING, COMPLETED, CANCELLED)
     */
    public async updateOrder(
        merchant: Merchant,
        updateOrderStatusDto: UpdateOrderDto
    ): Promise<Order> {
        const { id, status, message } = updateOrderStatusDto
        const order = await this.orderRepository.findOne({
            where: { id, merchant },
            // since merchant object doesnt have email, we are retrieving related to merchant object
            // so we can use the email of the merchant to send the mail to the user
            // user -> Person who placed the order
            // merchant -> Person who received the order
            //merchant.user -> user related to the following merchant
            relations: ['product', 'user', 'merchant', 'merchant.user'],
        })
        if (!order) throw new NotFoundException('Order not found')
        order.orderStatus = status
        if (status === OrderStatus.COMPLETED) {
            merchant.netIncome += order.totalPrice
            merchant.pendingAmount += order.totalPrice
            await this.merchantRepository.save(merchant)
        }
        await this.orderRepository.save(order)
        await this.mailService.sendMail({
            from: order?.merchant.user.email,
            to: order?.user.email,
            subject: `Your order is ${status.toLowerCase()}`,
            template: 'orderStatusUpdated',
            context: {
                message,
            },
        })
        this.logger.log(
            `${merchant.businessName} updated the order status to ${status}`
        )
        return order
    }
}

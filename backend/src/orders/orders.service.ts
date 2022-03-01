import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { MailerService } from '@nestjs-modules/mailer'
import Dinero from 'dinero.js'
import { InjectStripe } from 'nestjs-stripe'
import Stripe from 'stripe'
import { Repository } from 'typeorm'

import { OrderStatus } from '../common/types'
import { ICreateOrder } from '../common/types/create-order.interface'
import { Merchant } from '../merchants/entity/merchant.entity'
import { ProductsService } from '../products/products.service'
import { User } from '../users/entities/user.entity'
import { CheckoutDto } from './dto/checkout.dto'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name)
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectStripe()
        private readonly stripeClient: Stripe,
        private readonly productService: ProductsService,
        private readonly mailService: MailerService,
        private readonly configService: ConfigService
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
     * Creates a new order
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
        // once a order is successfully completed , decrease the quantity of the product based on the quantity of the order
        const remainingProductQuantity = product.quantity - quantity
        this.productService.updateProduct(product.merchant, product.id, {
            quantity: remainingProductQuantity,
        })
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
            order: { createdAt: 'DESC' },
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
    public async cancelOrder(user: User, orderId: string): Promise<string> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId, user },
        })
        if (!order) throw new NotFoundException('Order not found')
        if (order.orderStatus === OrderStatus.COMPLETED) {
            throw new BadRequestException('Order is already completed')
        }
        order.orderStatus = OrderStatus.CANCELLED
        await this.orderRepository.save(order)
        this.logger.log(`${user.username} cancelled the order`)
        return 'Order cancelled'
    }
    public async createCheckoutSession(
        productId: string,
        user: User,
        checkoutDto: CheckoutDto
    ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
        try {
            const product = await this.productService.findProductById(productId)
            return await this.stripeClient.checkout.sessions.create({
                payment_method_types: ['card'],
                success_url: 'http://localhost:3000/order-completed',
                cancel_url: 'http://localhost:3000/profile',
                customer_email: user.email,
                client_reference_id: productId,
                line_items: [
                    {
                        name: product.name,
                        description: product.description,
                        //!TODO - SWITCH TO REAL IMAGES ONCE DEPLOYED
                        images: [product.coverImage],
                        // All products on the page displays currency in NPR
                        // since stripe doesn't support NPR we have to convert NPR to USD
                        amount: Dinero({
                            amount: product.price,
                            currency: 'NPR',
                        }).getAmount(),
                        currency: 'usd',
                        quantity: checkoutDto.quantity,
                    },
                ],
            })
        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }
    }
    public async webhookCheckout(
        payload: string,
        signature: string
    ): Promise<void> {
        try {
            const event = this.stripeClient.webhooks.constructEvent(
                payload,
                signature,
                this.configService.get('STRIPE_WEBHOOK_SECRET') as string
            )
            if (event.type === 'checkout.session.completed') {
                const {
                    customer_email,
                    client_reference_id: productId,
                    amount_subtotal,
                } = event.data.object as Stripe.Checkout.Session
                if (!customer_email || !productId)
                    throw new BadRequestException(
                        'Customer email or product id not found'
                    )
                const user = await this.userRepository.findOne({
                    email: customer_email,
                })
                const product = await this.productService.findProductById(
                    productId
                )
                if (!user || !product)
                    throw new BadRequestException('User or product not found')
                await this.create(user, {
                    productId: product.id,
                    quantity: (amount_subtotal ?? 0) / product.price,
                })
            }
        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }
    }
}

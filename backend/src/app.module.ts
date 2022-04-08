import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { StripeModule } from 'nestjs-stripe'
import { join } from 'node:path'

import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { CartsModule } from './carts/carts.module'
import { ChatModule } from './chat/chat.module'
import { createTransporter } from './helpers/create-transporter'
import { MerchantsModule } from './merchants/merchants.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { ReportsModule } from './reports/reports.module'
import { ReviewsModule } from './reviews/reviews.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), '/public'),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                database: configService.get<string>('DB_NAME'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.get('NODE_ENV') === 'development',
            }),
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                defaults: {
                    from: `Digihub Inc <${configService.get('EMAIL_FROM')}>`,
                },
                transport: createTransporter(configService),
                template: {
                    dir: join(process.cwd(), 'src/assets/templates'),
                    adapter: new PugAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        StripeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                apiKey: configService.get('STRIPE_API_KEY') as string,
                apiVersion: '2020-08-27',
            }),
        }),
        AuthModule,
        UsersModule,
        ProductsModule,
        CartsModule,
        OrdersModule,
        MerchantsModule,
        AdminModule,
        ReviewsModule,
        ChatModule,
        ReportsModule,
    ],
})
export class AppModule {}

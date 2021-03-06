import { INestApplication } from '@nestjs/common'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { raw } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:3001']

export const registerMiddlewares = (app: INestApplication): void => {
    // https://github.com/stripe/stripe-node#webhook-signing
    app.use('/api/v1/orders/webhooks', raw({ type: '*/*' }))
    app.use(compression())
    app.enableCors({
        origin: [...ALLOWED_ORIGINS],
        credentials: true,
    })
    app.use(cookieParser())
    app.use(morgan('dev'))
    app.use(helmet())
}

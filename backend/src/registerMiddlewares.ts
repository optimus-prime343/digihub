import { INestApplication } from '@nestjs/common'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'

export const registerMiddlewares = (app: INestApplication): void => {
    app.use(compression())
    app.enableCors({ origin: 'http://localhost:3000', credentials: true })
    app.use(cookieParser())
    app.use(morgan('dev'))
    app.use(helmet())
}

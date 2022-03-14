import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { API_GLOBAL_PREFIX, PORT } from './constants'
import { registerMiddlewares } from './register-middlewares'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix(API_GLOBAL_PREFIX)
    app.useGlobalPipes(new ValidationPipe())
    registerMiddlewares(app)
    await app.listen(PORT)
    Logger.log(`✅ Api running on http://localhost:${PORT}${API_GLOBAL_PREFIX}`)
}
bootstrap()

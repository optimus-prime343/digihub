import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { Merchant } from '../merchants/entity/merchant.entity'
import { User } from '../users/entities/user.entity'

/**
 * Retrieves the merchant from the request.user
 */
export const GetMerchant = createParamDecorator(
    (_data: unknown, context: ExecutionContext): Merchant => {
        const { user } = context.switchToHttp().getRequest<{ user: User }>()
        return user.merchant as Merchant
    }
)

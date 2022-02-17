import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../users/entities/user.entity'

export const GetUser = createParamDecorator(
    (_: unknown, context: ExecutionContext): User => {
        const { user } = context.switchToHttp().getRequest<{ user: User }>()
        return user
    }
)

import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { Role } from '../common/types'

export const Roles = (...roles: Role[]): CustomDecorator<string> =>
    SetMetadata('roles', roles)

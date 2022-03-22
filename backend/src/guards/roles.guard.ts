import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Role } from '../common/types'
import { User } from '../users/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ])
        // if there is no roles in route handler, this means that the route is public
        if (!roles) return true
        // if the role is admin, then provide access to the route
        if (roles.includes(Role.ADMIN)) return true
        const { user } = context.switchToHttp().getRequest<{ user: User }>()
        return roles.includes(user.role)
    }
}

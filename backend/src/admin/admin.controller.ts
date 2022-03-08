import { Controller, Param, Patch, Post, UseGuards } from '@nestjs/common'

import { Role } from '../common/types'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { UpdateMerchanStatusDto } from '../merchants/dtos/update-merchant-status.dto'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { AdminService } from './admin.service'

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Patch('/update-merchant-status/:merchantId/:status')
    public async updateMerchantStatus(
        @Param() updateMerchantStatusDto: UpdateMerchanStatusDto
    ): Promise<string> {
        return this.adminService.updateMerchantStatus(updateMerchantStatusDto)
    }
    @Post()
    public async createAdmin(createUserDto: CreateUserDto): Promise<string> {
        return this.adminService.createAdmin(createUserDto)
    }
}

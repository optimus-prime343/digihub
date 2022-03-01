import { Controller, Param, Patch, UseGuards } from '@nestjs/common'

import { Role } from '../common/types'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { UpdateMerchanStatusDto } from '../merchants/dtos/update-merchant-status.dto'
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
}

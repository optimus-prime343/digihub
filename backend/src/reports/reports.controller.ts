import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { Role } from '../common/types'
import { Roles } from '../decorators/roles.decorator'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { CreateReportDto } from './dtos/create-report.dto'
import { Report } from './entities/report.entity'
import { ReportsService } from './reports.service'

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Roles(Role.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createReportDto: CreateReportDto): Promise<string> {
        return this.reportsService.create(createReportDto)
    }
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll(): Promise<Report[]> {
        return this.reportsService.findAll()
    }
}

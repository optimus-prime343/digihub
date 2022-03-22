import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateReportDto } from './dtos/create-report.dto'
import { Report } from './entities/report.entity'

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report)
        private readonly reportsRepository: Repository<Report>
    ) {}
    async create(createReportDto: CreateReportDto): Promise<string> {
        const newReport = this.reportsRepository.create(createReportDto)
        await this.reportsRepository.save(newReport)
        return `Your report has been submitted and will be reviewed shortly.`
    }
    async findAll(): Promise<Report[]> {
        return this.reportsRepository.find()
    }
}

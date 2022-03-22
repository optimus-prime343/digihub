import { IsNotEmpty } from 'class-validator'

export class CreateReportDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    reportedBy: string

    @IsNotEmpty()
    reportedBusiness: string
}

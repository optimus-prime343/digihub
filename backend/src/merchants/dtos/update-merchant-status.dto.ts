import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'

import { MerchantStatus } from '../../common/types'

export class UpdateMerchanStatusDto {
    @IsNotEmpty()
    @IsEnum(MerchantStatus)
    status: MerchantStatus

    @IsNotEmpty()
    @IsUUID()
    merchantId: string
}

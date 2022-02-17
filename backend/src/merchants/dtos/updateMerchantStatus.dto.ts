import { IsEnum, IsNotEmpty } from 'class-validator'

import { MerchantStatus } from '../../common/types'

export class UpdateMerchanStatusDto {
    @IsNotEmpty()
    @IsEnum(MerchantStatus)
    status: MerchantStatus
}

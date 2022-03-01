import { IsEnum, IsString, IsUUID, Length } from 'class-validator'

import { OrderStatus } from '../../common/types'

export class UpdateOrderDto {
    @IsUUID()
    id: string

    @IsEnum(OrderStatus)
    status: OrderStatus

    @IsString()
    @Length(10, 300)
    message: string
}

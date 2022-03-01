import { IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateReviewDto {
    @IsUUID()
    productId: string

    @MinLength(10)
    @MaxLength(400)
    review: string

    @Min(0)
    @Max(5)
    rating: number
}

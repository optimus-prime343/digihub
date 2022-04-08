import { IsNotEmpty, Max, Min } from 'class-validator'

export class UpdateReviewDto {
    @IsNotEmpty()
    review: string

    @Min(1)
    @Max(5)
    rating: number
}

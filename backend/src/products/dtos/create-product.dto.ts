import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MinLength,
} from 'class-validator'

export class CreateProductDto {
    @IsString()
    @Length(5, 40)
    public name: string

    @IsString()
    @MinLength(15)
    public description: string

    @IsNotEmpty()
    public price: string

    @IsNotEmpty()
    public quantity: string

    // since we are using formdata while creating images and we cant pass array in formdata
    // we are using string and splitting it by comma
    @IsOptional()
    public tags: string
}

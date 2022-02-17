import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @Length(5, 40)
    public name: string

    @IsString()
    @Length(20, 350)
    public description: string

    @IsNotEmpty()
    public price: string

    @IsString({ each: true })
    public images: string[]
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsOptional()
    price: number
}

export class UpdatePriceDto {
    @IsNumber()
    price: number
}
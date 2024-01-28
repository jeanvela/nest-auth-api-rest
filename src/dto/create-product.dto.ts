import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatedProductDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    price: number
}
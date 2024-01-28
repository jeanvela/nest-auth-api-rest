import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    usernema: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
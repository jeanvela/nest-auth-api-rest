import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthenticationAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
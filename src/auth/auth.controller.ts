import { Controller, Post, Body, ConflictException, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from 'src/dto/create-auth.dto';
import { AuthenticationAuthDto } from 'src/dto/authentication-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signUp')
    async signUp(@Body() body: CreateAuthDto) {
        try {
            const newUser = await this.authService.signup(body)
            return newUser
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists')
            }
            throw error
        }
    }

    @Post('signIn')
    async signIn(@Body() body: AuthenticationAuthDto, @Res() res: Response) {
        try {
            const user = await this.authService.signin(body)
            const token = user.access_token
            res.header('Authorization', `Bearer ${token}`)
            return res.status(HttpStatus.OK).json(user)
        } catch (error) {
            throw error
        }
    }
}

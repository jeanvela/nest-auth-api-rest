import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/models/auth.schema';
import { CreateAuthDto } from 'src/dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationAuthDto } from 'src/dto/authentication-auth.dto';
import { Bcrypt } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>, private jwtService: JwtService) {}

    async signup(user: CreateAuthDto) {
        const passwordHash = await Bcrypt.hashPassword(user.password)
        const newUser = new this.authModel({...user, password: passwordHash})
        await newUser.save()
        return newUser
    }

    async signin(user: AuthenticationAuthDto) {
        const isUser = await this.authModel.findOne({email: user.email})
        if (!isUser) throw new UnauthorizedException('Invalid email')
        const isMatch = await Bcrypt.comparePassword(user.password, isUser.password)
        if (!isMatch) throw new UnauthorizedException('Invalid password')
        const payload = {
            id: isUser._id,
            username: isUser.username,
            email: isUser.email,
            status: isUser.status
        }
        return {
            ...payload,
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}

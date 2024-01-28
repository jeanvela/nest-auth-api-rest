import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(req);
        if (!token) throw new UnauthorizedException('Token not provided');
        try {
            const payload = this.jwtService.verify(token);
            req.user = payload
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
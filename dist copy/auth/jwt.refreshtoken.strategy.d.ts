import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(req: any, payload: any): Promise<UnauthorizedException | {
        userId: any;
        email: any;
    }>;
}
export {};

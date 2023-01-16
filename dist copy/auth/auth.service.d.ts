import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AccountLoginDTO } from 'src/users/dto/account-login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(accountLoginDto: AccountLoginDTO): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    generateRefreshToken(userId: string): Promise<string>;
}

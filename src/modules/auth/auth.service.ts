import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as randtoken from 'rand-token';
import { AccountLoginDTO } from '../users/dto/account-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(accountLoginDto: AccountLoginDTO): Promise<any> {

    const user = await this.usersService.login(accountLoginDto);
    // console.log('validateUser: ', user);
    if (user) {
      // const { password, ...result } =  user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET}`, expiresIn: '1h' }),
      refresh_token: await this.generateRefreshToken(user._id),
    };
  }
  

  async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = randtoken.generate(16);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    await this.usersService.update(userId, { refreshToken, refreshtokenexpires: expiryDate.toDateString() });
    return refreshToken;
  }
}

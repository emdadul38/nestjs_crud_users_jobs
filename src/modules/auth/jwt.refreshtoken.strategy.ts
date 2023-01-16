import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, `${process.env.JWT_REFRESH_TOKEN}`) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      return new UnauthorizedException();
    }

    if(req.body.refreshToken === user.refreshToken) {
      return new UnauthorizedException();
    }

    if(new Date() > new Date(user.refreshtokenexpires)) {
      return new UnauthorizedException();
    }

    return { userId: payload.sub, email: payload.email };
  }
}
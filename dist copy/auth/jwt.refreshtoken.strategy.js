"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const users_service_1 = require("../users/users.service");
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, `${process.env.JWT_REFRESH_TOKEN}`) {
    constructor(usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET}`,
            passReqToCallback: true,
        });
        this.usersService = usersService;
    }
    async validate(req, payload) {
        const user = await this.usersService.findOneByEmail(payload.email);
        if (!user) {
            return new common_1.UnauthorizedException();
        }
        if (req.body.refreshToken === user.refreshToken) {
            return new common_1.UnauthorizedException();
        }
        if (new Date() > new Date(user.refreshtokenexpires)) {
            return new common_1.UnauthorizedException();
        }
        return { userId: payload.sub, email: payload.email };
    }
};
JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], JwtRefreshTokenStrategy);
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
//# sourceMappingURL=jwt.refreshtoken.strategy.js.map
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const randtoken = require("rand-token");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(accountLoginDto) {
        const user = await this.usersService.login(accountLoginDto);
        if (user) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET}`, expiresIn: '1h' }),
            refresh_token: await this.generateRefreshToken(user._id),
        };
    }
    async generateRefreshToken(userId) {
        const refreshToken = randtoken.generate(16);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        await this.usersService.update(userId, { refreshToken, refreshtokenexpires: expiryDate.toDateString() });
        return refreshToken;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
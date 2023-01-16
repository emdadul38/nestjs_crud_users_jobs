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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_1 = require("../schemas/user");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const user = await this.userModel.findOne({ email: createUserDto.email });
            if (user) {
                throw new common_1.ConflictException('Email already exists');
            }
            const createdUser = new this.userModel(createUserDto);
            return await createdUser.save();
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                throw new common_1.BadRequestException(error.errors);
            }
            if (error.status === 409)
                throw new common_1.ConflictException(error.message);
            if (error.status === 400)
                throw new common_1.BadRequestException(error.message);
            if (error.status >= 500)
                throw new common_1.ServiceUnavailableException();
        }
    }
    async login(accountLoginDto) {
        const { email, password } = accountLoginDto;
        const user = await this.userModel.findOne({ email }, '+password');
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await this.userModel.findByEmailAndPassword(email, password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async search(name) {
        const users = await this.userModel.find().byName(name);
        return users;
    }
    async findAll() {
        const users = await this.userModel.find();
        return users;
    }
    async findOneByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async remove(id) {
        const deleteUser = await this.userModel.findByIdAndDelete(id);
        if (!deleteUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            _id: id,
        };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.USER_MODEL)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
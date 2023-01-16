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
exports.USER_MODEL = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../constants");
const common_1 = require("../common");
const bcrypt_1 = require("bcrypt");
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "refreshtokenexpires", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.keys(constants_1.ACCOUNT_STATUS),
        default: constants_1.ACCOUNT_STATUS.ACTIVE,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.keys(constants_1.ACCOUNT_TYPE),
        immutable: true,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "accountType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], User.prototype, "social", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVarified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: common_1.AddressSchema, required: true }),
    __metadata("design:type", common_1.Address)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        reference: { type: String },
        beta: { type: Boolean },
    })),
    __metadata("design:type", Object)
], User.prototype, "metafields", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        methods: {
            isValidPassword: async function (candidatePassword) {
                const hasedPassword = this.password;
                const isMatched = await (0, bcrypt_1.compare)(candidatePassword, hasedPassword);
                return isMatched;
            },
        },
        statics: {
            async findByEmailAndPassword(email, password) {
                const user = await this.findOne({ email }, '+password');
                if (!user)
                    return;
                const isPwdMatched = await user.isValidPassword(password);
                if (!isPwdMatched)
                    return;
                return user;
            },
        },
        query: {
            byName(name) {
                return this.where({ name: new RegExp(name, 'i') });
            }
        },
        discriminatorKey: 'userKind',
    })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', async function (next) {
    const hashedPassword = await (0, bcrypt_1.hash)(this.password, 10);
    this.password = hashedPassword;
    next();
});
exports.USER_MODEL = User.name;
//# sourceMappingURL=user.schema.js.map
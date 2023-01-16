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
exports.EMPLOYER_MODEL = exports.EmployerSchema = exports.Employer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_1 = require("../user");
let Employer = class Employer extends user_1.User {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Employer.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Employer.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Employer.prototype, "workArea", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Employer.prototype, "website", void 0);
Employer = __decorate([
    (0, mongoose_1.Schema)()
], Employer);
exports.Employer = Employer;
exports.EmployerSchema = mongoose_1.SchemaFactory.createForClass(Employer);
exports.EMPLOYER_MODEL = Employer.name;
//# sourceMappingURL=employer.schema.js.map
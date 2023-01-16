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
exports.JOB_MODEL = exports.JobSchema = exports.Job = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_1 = require("../user");
const constants_1 = require("../../constants");
const common_1 = require("../common");
let Job = class Job {
};
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: user_1.USER_MODEL, required: true }),
    __metadata("design:type", Object)
], Job.prototype, "employer", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "companyName", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", Number)
], Job.prototype, "experience", void 0);
__decorate([
    (0, mongoose_2.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Job.prototype, "tags", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Job.prototype, "salary", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        enum: Object.keys(constants_1.JOB_TYPE),
        required: true,
    }),
    __metadata("design:type", String)
], Job.prototype, "type", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: common_1.AddressSchema, required: true }),
    __metadata("design:type", common_1.Address)
], Job.prototype, "location", void 0);
Job = __decorate([
    (0, mongoose_2.Schema)({
        timestamps: true,
    })
], Job);
exports.Job = Job;
exports.JobSchema = mongoose_2.SchemaFactory.createForClass(Job);
function populateMiddleware(next) {
    this.populate({ path: 'employer', select: { name: 1, _id: 1 } });
    next();
}
exports.JobSchema.pre('findOne', populateMiddleware);
exports.JobSchema.pre('find', populateMiddleware);
exports.JOB_MODEL = Job.name;
//# sourceMappingURL=job.schema.js.map
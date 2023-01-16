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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_1 = require("../schemas/job");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const constants_1 = require("../constants");
let JobsService = class JobsService {
    constructor(jobModel, usersService) {
        this.jobModel = jobModel;
        this.usersService = usersService;
    }
    async create(createJobDto) {
        try {
            const user = await this.usersService.findOne(createJobDto.userId);
            if (!user) {
                throw new Error('User not found');
            }
            else if (user.accountType !== constants_1.ACCOUNT_TYPE.EMPLOYER) {
                throw new Error('User is not an employer');
            }
            return this.jobModel.create(Object.assign(Object.assign({}, createJobDto), { employer: createJobDto.userId }));
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        return this.jobModel.find();
    }
    async findOne(id) {
        const job = await this.jobModel.findById(id);
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return job;
    }
    async update(id, updateJobDto) {
        const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return job;
    }
    async remove(id) {
        const job = await this.jobModel.findByIdAndDelete(id);
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        return {
            _id: job._id,
        };
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_1.JOB_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map
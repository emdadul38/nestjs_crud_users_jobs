"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseModelsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const employer_1 = require("./employer");
const job_schema_1 = require("./job/job.schema");
const student_1 = require("./student");
const user_schema_1 = require("./user/user.schema");
const MODULES = [
    {
        name: user_schema_1.USER_MODEL,
        schema: user_schema_1.UserSchema,
        discriminators: [
            { name: employer_1.EMPLOYER_MODEL, schema: employer_1.EmployerSchema },
            { name: student_1.STUDENT_MODEL, schema: student_1.StudentSchema }
        ],
    },
    { name: job_schema_1.JOB_MODEL, schema: job_schema_1.JobSchema },
];
let MongooseModelsModule = class MongooseModelsModule {
};
MongooseModelsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(MODULES)],
        exports: [mongoose_1.MongooseModule],
    })
], MongooseModelsModule);
exports.MongooseModelsModule = MongooseModelsModule;
//# sourceMappingURL=mongoose-model.module.js.map
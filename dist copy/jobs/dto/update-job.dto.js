"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobDTO = void 0;
const create_job_dto_1 = require("./create-job.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateJobDTO extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_job_dto_1.CreateJobDTO, ["userId"])) {
}
exports.UpdateJobDTO = UpdateJobDTO;
//# sourceMappingURL=update-job.dto.js.map
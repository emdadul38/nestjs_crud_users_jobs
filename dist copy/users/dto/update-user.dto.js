"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDTO = void 0;
const create_user_dto_1 = require("./create-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class updateUserDTO extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_user_dto_1.createUserDTO, ['accountType', 'metafields'])) {
}
exports.updateUserDTO = updateUserDTO;
//# sourceMappingURL=update-user.dto.js.map
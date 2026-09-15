"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_student_dto_1 = require("./create-student.dto");
class UpdateStudentDto extends (0, mapped_types_1.PartialType)((0, mapped_types_1.OmitType)(create_student_dto_1.CreateStudentDto, ['schoolYearId'])) {
}
exports.UpdateStudentDto = UpdateStudentDto;
//# sourceMappingURL=update-student.dto.js.map
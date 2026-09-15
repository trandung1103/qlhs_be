"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchoolYearDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_school_year_dto_1 = require("./create-school-year.dto");
class UpdateSchoolYearDto extends (0, mapped_types_1.PartialType)(create_school_year_dto_1.CreateSchoolYearDto) {
}
exports.UpdateSchoolYearDto = UpdateSchoolYearDto;
//# sourceMappingURL=update-school-year.dto.js.map
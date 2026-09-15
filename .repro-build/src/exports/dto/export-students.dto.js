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
exports.ExportStudentsDto = void 0;
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const students_constants_1 = require("../../students/students.constants");
class ExportSortDto {
}
__decorate([
    (0, class_validator_1.IsIn)(Object.keys(students_constants_1.STUDENT_SORTABLE_FIELDS)),
    __metadata("design:type", String)
], ExportSortDto.prototype, "field", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    __metadata("design:type", String)
], ExportSortDto.prototype, "order", void 0);
class ExportFiltersDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.Gender),
    __metadata("design:type", String)
], ExportFiltersDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.StudentStatus),
    __metadata("design:type", String)
], ExportFiltersDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ExportFiltersDto.prototype, "hasHealthInsurance", void 0);
class ExportStudentsDto {
}
exports.ExportStudentsDto = ExportStudentsDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ExportStudentsDto.prototype, "schoolYearId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExportStudentsDto.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ExportStudentsDto.prototype, "fields", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExportStudentsDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ExportFiltersDto),
    __metadata("design:type", ExportFiltersDto)
], ExportStudentsDto.prototype, "filters", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ExportSortDto),
    __metadata("design:type", ExportSortDto)
], ExportStudentsDto.prototype, "sort", void 0);
//# sourceMappingURL=export-students.dto.js.map
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
exports.ExportsService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJS = require("exceljs");
const prisma_service_1 = require("../prisma/prisma.service");
const students_query_util_1 = require("../students/students-query.util");
const students_constants_1 = require("../students/students.constants");
const student_export_fields_1 = require("./student-export-fields");
let ExportsService = class ExportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async resolveColumns(fields, schoolYearId) {
        const customFieldIds = fields
            .filter((f) => f.startsWith(student_export_fields_1.CUSTOM_FIELD_PREFIX))
            .map((f) => f.slice(student_export_fields_1.CUSTOM_FIELD_PREFIX.length));
        const customFieldDefs = customFieldIds.length
            ? await this.prisma.fieldDefinition.findMany({
                where: { id: { in: customFieldIds }, schoolYearId },
                include: { options: true },
            })
            : [];
        const customFieldById = new Map(customFieldDefs.map((f) => [f.id, f]));
        return fields.map((field) => {
            if (field.startsWith(student_export_fields_1.CUSTOM_FIELD_PREFIX)) {
                const id = field.slice(student_export_fields_1.CUSTOM_FIELD_PREFIX.length);
                const def = customFieldById.get(id);
                if (!def) {
                    throw new common_1.BadRequestException(`Custom field ${id} not found for this school year`);
                }
                const optionLabelByValue = new Map(def.options.map((o) => [o.value, o.label]));
                return {
                    header: def.name,
                    getValue: (student) => {
                        const values = (student.fieldValues ?? [])
                            .filter((v) => v.fieldDefinitionId === id)
                            .map((v) => optionLabelByValue.get(v.value ?? '') ?? v.value ?? '');
                        return values.join(', ');
                    },
                };
            }
            const systemField = student_export_fields_1.STUDENT_EXPORT_FIELDS[field];
            if (!systemField) {
                throw new common_1.BadRequestException(`Unknown export field: ${field}`);
            }
            return systemField;
        });
    }
    async exportStudents(dto) {
        const schoolYear = await this.prisma.schoolYear.findUnique({
            where: { id: dto.schoolYearId },
        });
        if (!schoolYear) {
            throw new common_1.BadRequestException('School year not found');
        }
        if (dto.classId) {
            const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
            if (!cls || cls.schoolYearId !== dto.schoolYearId) {
                throw new common_1.BadRequestException('Class does not belong to the selected school year');
            }
        }
        const columns = await this.resolveColumns(dto.fields, dto.schoolYearId);
        const where = (0, students_query_util_1.buildStudentWhere)({
            schoolYearId: dto.schoolYearId,
            classId: dto.classId,
            search: dto.search,
            gender: dto.filters?.gender,
            status: dto.filters?.status,
            hasHealthInsurance: dto.filters?.hasHealthInsurance,
        });
        const orderBy = dto.sort
            ? students_constants_1.STUDENT_SORTABLE_FIELDS[dto.sort.field](dto.sort.order)
            : { createdAt: 'desc' };
        const needsFieldValues = dto.fields.some((f) => f.startsWith(student_export_fields_1.CUSTOM_FIELD_PREFIX));
        const students = await this.prisma.student.findMany({
            where,
            orderBy,
            include: {
                class: true,
                ...(needsFieldValues ? { fieldValues: true } : {}),
            },
        });
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Học sinh');
        sheet.columns = columns.map((c) => ({ header: c.header, key: c.header, width: 22 }));
        sheet.getRow(1).font = { bold: true };
        for (const student of students) {
            const row = {};
            for (const column of columns) {
                row[column.header] = column.getValue(student);
            }
            sheet.addRow(row);
        }
        return workbook.xlsx.writeBuffer();
    }
};
exports.ExportsService = ExportsService;
exports.ExportsService = ExportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExportsService);
//# sourceMappingURL=exports.service.js.map
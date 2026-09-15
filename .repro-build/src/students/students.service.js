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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const update_student_dto_1 = require("./dto/update-student.dto");
const name_splitter_1 = require("../common/utils/name-splitter");
const students_constants_1 = require("./students.constants");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const demo_students_data_1 = require("./demo-students.data");
const students_query_util_1 = require("./students-query.util");
let StudentsService = class StudentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    resolveNameFields(input) {
        const { fullName, familyAndMiddleName, firstName } = input;
        if (familyAndMiddleName !== undefined || firstName !== undefined) {
            return {
                fullName: fullName ?? `${familyAndMiddleName ?? ''} ${firstName ?? ''}`.trim(),
                familyAndMiddleName: familyAndMiddleName ?? '',
                firstName: firstName ?? '',
            };
        }
        if (fullName !== undefined) {
            return (0, name_splitter_1.splitFullName)(fullName);
        }
        return {};
    }
    async assertClassBelongsToSchoolYear(classId, schoolYearId) {
        const cls = await this.prisma.class.findUnique({ where: { id: classId } });
        if (!cls) {
            throw new common_1.BadRequestException('Class not found');
        }
        if (cls.schoolYearId !== schoolYearId) {
            throw new common_1.BadRequestException('The selected class does not belong to the selected school year');
        }
        return cls;
    }
    toDateOrUndefined(value) {
        return value ? new Date(value) : value === '' ? null : undefined;
    }
    async setCustomFieldValues(studentId, schoolYearId, customFields) {
        const fieldDefinitionIds = Object.keys(customFields);
        if (fieldDefinitionIds.length === 0)
            return;
        const fields = await this.prisma.fieldDefinition.findMany({
            where: { id: { in: fieldDefinitionIds }, schoolYearId, isActive: true },
        });
        const fieldById = new Map(fields.map((f) => [f.id, f]));
        for (const fieldDefinitionId of fieldDefinitionIds) {
            const field = fieldById.get(fieldDefinitionId);
            if (!field) {
                throw new common_1.BadRequestException(`Field ${fieldDefinitionId} does not exist or is not active for this school year`);
            }
            const rawValue = customFields[fieldDefinitionId];
            if (field.type === 'CHECKBOX') {
                const values = Array.isArray(rawValue) ? rawValue : [rawValue];
                await this.prisma.studentFieldValue.deleteMany({
                    where: { studentId, fieldDefinitionId },
                });
                if (values.length > 0) {
                    await this.prisma.studentFieldValue.createMany({
                        data: values.map((value) => ({ studentId, fieldDefinitionId, value })),
                    });
                }
            }
            else {
                const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
                const existing = await this.prisma.studentFieldValue.findFirst({
                    where: { studentId, fieldDefinitionId },
                });
                if (existing) {
                    await this.prisma.studentFieldValue.update({
                        where: { id: existing.id },
                        data: { value },
                    });
                }
                else {
                    await this.prisma.studentFieldValue.create({
                        data: { studentId, fieldDefinitionId, value },
                    });
                }
            }
        }
    }
    async nextDisplayOrder(classId) {
        const last = await this.prisma.student.findFirst({
            where: { classId },
            orderBy: { displayOrder: 'desc' },
            select: { displayOrder: true },
        });
        return (last?.displayOrder ?? 0) + 1;
    }
    async create(dto) {
        await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);
        const names = this.resolveNameFields(dto);
        const displayOrder = await this.nextDisplayOrder(dto.classId);
        const student = await this.prisma.student.create({
            data: {
                schoolYearId: dto.schoolYearId,
                classId: dto.classId,
                displayOrder,
                ...names,
                dateOfBirth: this.toDateOrUndefined(dto.dateOfBirth),
                gender: dto.gender,
                identifier: dto.identifier,
                ethnicity: dto.ethnicity,
                nationality: dto.nationality,
                address: dto.address,
                studentPhone: dto.studentPhone,
                previousSchool: dto.previousSchool,
                status: dto.status,
                fatherName: dto.fatherName,
                fatherPhone: dto.fatherPhone,
                fatherJob: dto.fatherJob,
                fatherWorkplace: dto.fatherWorkplace,
                motherName: dto.motherName,
                motherPhone: dto.motherPhone,
                motherJob: dto.motherJob,
                motherWorkplace: dto.motherWorkplace,
                hasHealthInsurance: dto.hasHealthInsurance,
                healthInsuranceNumber: dto.healthInsuranceNumber,
                healthInsuranceStartDate: this.toDateOrUndefined(dto.healthInsuranceStartDate),
                healthInsuranceEndDate: this.toDateOrUndefined(dto.healthInsuranceEndDate),
                healthInsuranceRegisteredHospital: dto.healthInsuranceRegisteredHospital,
                emergencyContactName: dto.emergencyContactName,
                emergencyContactRelationship: dto.emergencyContactRelationship,
                emergencyContactPhone: dto.emergencyContactPhone,
                policyCategory: dto.policyCategory,
                bloodType: dto.bloodType,
                allergy: dto.allergy,
                healthNotes: dto.healthNotes,
                notes: dto.notes,
            },
        });
        if (dto.customFields) {
            await this.setCustomFieldValues(student.id, dto.schoolYearId, dto.customFields);
        }
        return student;
    }
    async findAll(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const where = (0, students_query_util_1.buildStudentWhere)(query);
        const orderBy = query.sortBy
            ? students_constants_1.STUDENT_SORTABLE_FIELDS[query.sortBy](query.sortOrder ?? 'asc')
            : students_constants_1.DEFAULT_STUDENT_SORT;
        const [data, total] = await Promise.all([
            this.prisma.student.findMany({
                where,
                orderBy,
                skip: (page - 1) * limit,
                take: limit,
                include: { class: true, fieldValues: true },
            }),
            this.prisma.student.count({ where }),
        ]);
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            },
        };
    }
    async findOne(id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: { class: true, fieldValues: { include: { fieldDefinition: true } } },
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        return student;
    }
    buildUpdateData(dto) {
        const names = this.resolveNameFields(dto);
        const data = {
            ...names,
        };
        if (dto.classId !== undefined)
            data.class = { connect: { id: dto.classId } };
        if (dto.dateOfBirth !== undefined)
            data.dateOfBirth = this.toDateOrUndefined(dto.dateOfBirth);
        if (dto.gender !== undefined)
            data.gender = dto.gender;
        if (dto.identifier !== undefined)
            data.identifier = dto.identifier;
        if (dto.ethnicity !== undefined)
            data.ethnicity = dto.ethnicity;
        if (dto.nationality !== undefined)
            data.nationality = dto.nationality;
        if (dto.address !== undefined)
            data.address = dto.address;
        if (dto.studentPhone !== undefined)
            data.studentPhone = dto.studentPhone;
        if (dto.previousSchool !== undefined)
            data.previousSchool = dto.previousSchool;
        if (dto.status !== undefined)
            data.status = dto.status;
        if (dto.fatherName !== undefined)
            data.fatherName = dto.fatherName;
        if (dto.fatherPhone !== undefined)
            data.fatherPhone = dto.fatherPhone;
        if (dto.fatherJob !== undefined)
            data.fatherJob = dto.fatherJob;
        if (dto.fatherWorkplace !== undefined)
            data.fatherWorkplace = dto.fatherWorkplace;
        if (dto.motherName !== undefined)
            data.motherName = dto.motherName;
        if (dto.motherPhone !== undefined)
            data.motherPhone = dto.motherPhone;
        if (dto.motherJob !== undefined)
            data.motherJob = dto.motherJob;
        if (dto.motherWorkplace !== undefined)
            data.motherWorkplace = dto.motherWorkplace;
        if (dto.hasHealthInsurance !== undefined)
            data.hasHealthInsurance = dto.hasHealthInsurance;
        if (dto.healthInsuranceNumber !== undefined)
            data.healthInsuranceNumber = dto.healthInsuranceNumber;
        if (dto.healthInsuranceStartDate !== undefined)
            data.healthInsuranceStartDate = this.toDateOrUndefined(dto.healthInsuranceStartDate);
        if (dto.healthInsuranceEndDate !== undefined)
            data.healthInsuranceEndDate = this.toDateOrUndefined(dto.healthInsuranceEndDate);
        if (dto.healthInsuranceRegisteredHospital !== undefined)
            data.healthInsuranceRegisteredHospital = dto.healthInsuranceRegisteredHospital;
        if (dto.emergencyContactName !== undefined)
            data.emergencyContactName = dto.emergencyContactName;
        if (dto.emergencyContactRelationship !== undefined)
            data.emergencyContactRelationship = dto.emergencyContactRelationship;
        if (dto.emergencyContactPhone !== undefined)
            data.emergencyContactPhone = dto.emergencyContactPhone;
        if (dto.policyCategory !== undefined)
            data.policyCategory = dto.policyCategory;
        if (dto.bloodType !== undefined)
            data.bloodType = dto.bloodType;
        if (dto.allergy !== undefined)
            data.allergy = dto.allergy;
        if (dto.healthNotes !== undefined)
            data.healthNotes = dto.healthNotes;
        if (dto.notes !== undefined)
            data.notes = dto.notes;
        return data;
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (dto.classId && dto.classId !== existing.classId) {
            await this.assertClassBelongsToSchoolYear(dto.classId, existing.schoolYearId);
        }
        const data = this.buildUpdateData(dto);
        const updated = await this.prisma.student.update({ where: { id }, data });
        if (dto.customFields) {
            await this.setCustomFieldValues(id, existing.schoolYearId, dto.customFields);
        }
        return updated;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.student.delete({ where: { id } });
    }
    async reorder(dto) {
        const schoolYear = await this.prisma.schoolYear.findUnique({
            where: { id: dto.schoolYearId },
        });
        if (!schoolYear) {
            throw new common_1.BadRequestException('School year not found');
        }
        await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);
        const studentIds = dto.items.map((i) => i.studentId);
        const students = await this.prisma.student.findMany({
            where: { id: { in: studentIds } },
        });
        if (students.length !== studentIds.length) {
            throw new common_1.BadRequestException('One or more students were not found');
        }
        const unauthorized = students.find((s) => s.schoolYearId !== dto.schoolYearId || s.classId !== dto.classId);
        if (unauthorized) {
            throw new common_1.BadRequestException('One or more students do not belong to the selected school year/class');
        }
        await this.prisma.$transaction(dto.items.map((item) => this.prisma.student.update({
            where: { id: item.studentId },
            data: { displayOrder: item.order },
        })));
        return { success: true };
    }
    async bulkUpdate(dto) {
        const schoolYear = await this.prisma.schoolYear.findUnique({
            where: { id: dto.schoolYearId },
        });
        if (!schoolYear) {
            throw new common_1.BadRequestException('School year not found');
        }
        await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);
        const studentIds = dto.rows.map((r) => r.studentId);
        const students = await this.prisma.student.findMany({
            where: { id: { in: studentIds } },
        });
        const studentById = new Map(students.map((s) => [s.id, s]));
        const errors = [];
        const preparedUpdates = [];
        for (let i = 0; i < dto.rows.length; i++) {
            const row = dto.rows[i];
            const rowNumber = i + 1;
            const student = studentById.get(row.studentId);
            if (!student) {
                errors.push({ row: rowNumber, field: 'studentId', message: 'Student not found' });
                continue;
            }
            if (student.schoolYearId !== dto.schoolYearId || student.classId !== dto.classId) {
                errors.push({
                    row: rowNumber,
                    field: 'studentId',
                    message: 'Student does not belong to the selected school year/class',
                });
                continue;
            }
            const { customFields, schoolYearId: _sy, classId: _c, ...rest } = row.values;
            const instance = (0, class_transformer_1.plainToInstance)(update_student_dto_1.UpdateStudentDto, rest);
            const validationErrors = await (0, class_validator_1.validate)(instance, {
                whitelist: true,
                forbidNonWhitelisted: false,
            });
            if (validationErrors.length > 0) {
                for (const ve of validationErrors) {
                    const message = Object.values(ve.constraints ?? {})[0] ?? 'Invalid value';
                    errors.push({ row: rowNumber, field: ve.property, message });
                }
                continue;
            }
            preparedUpdates.push({ studentId: row.studentId, data: this.buildUpdateData(instance) });
        }
        if (errors.length > 0) {
            return { success: false, updatedCount: 0, errors };
        }
        await this.prisma.$transaction(preparedUpdates.map((u) => this.prisma.student.update({ where: { id: u.studentId }, data: u.data })));
        return { success: true, updatedCount: preparedUpdates.length, errors: [] };
    }
    async seedDemo(dto) {
        await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);
        for (const seed of demo_students_data_1.DEMO_STUDENTS) {
            await this.create({
                schoolYearId: dto.schoolYearId,
                classId: dto.classId,
                ...seed,
            });
        }
        return { createdCount: demo_students_data_1.DEMO_STUDENTS.length };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map
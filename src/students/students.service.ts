import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { splitFullName } from '../common/utils/name-splitter';
import { Paginated } from '../common/dto/pagination-query.dto';
import { DEFAULT_STUDENT_SORT, STUDENT_SORTABLE_FIELDS } from './students.constants';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  BulkUpdateStudentsDto,
  BulkUpdateError,
  BulkUpdateResult,
} from './dto/bulk-update-students.dto';
import { ReorderStudentsDto } from './dto/reorder-students.dto';
import { SeedDemoStudentsDto } from './dto/seed-demo-students.dto';
import { DEMO_STUDENTS } from './demo-students.data';
import { buildStudentWhere } from './students-query.util';
import { Prisma, Student } from '@prisma/client';

type NameInput = Pick<CreateStudentDto, 'fullName' | 'familyAndMiddleName' | 'firstName'>;

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  private resolveNameFields(input: NameInput) {
    const { fullName, familyAndMiddleName, firstName } = input;

    if (familyAndMiddleName !== undefined || firstName !== undefined) {
      return {
        fullName: fullName ?? `${familyAndMiddleName ?? ''} ${firstName ?? ''}`.trim(),
        familyAndMiddleName: familyAndMiddleName ?? '',
        firstName: firstName ?? '',
      };
    }

    if (fullName !== undefined) {
      return splitFullName(fullName);
    }

    return {};
  }

  private async assertClassBelongsToSchoolYear(classId: string, schoolYearId: string) {
    const cls = await this.prisma.class.findUnique({ where: { id: classId } });
    if (!cls) {
      throw new BadRequestException('Class not found');
    }
    if (cls.schoolYearId !== schoolYearId) {
      throw new BadRequestException(
        'The selected class does not belong to the selected school year',
      );
    }
    return cls;
  }

  private toDateOrUndefined(value?: string) {
    return value ? new Date(value) : value === '' ? null : undefined;
  }

  private async setCustomFieldValues(
    studentId: string,
    schoolYearId: string,
    customFields: Record<string, string | string[]>,
  ) {
    const fieldDefinitionIds = Object.keys(customFields);
    if (fieldDefinitionIds.length === 0) return;

    const fields = await this.prisma.fieldDefinition.findMany({
      where: { id: { in: fieldDefinitionIds }, schoolYearId, isActive: true },
    });
    const fieldById = new Map(fields.map((f) => [f.id, f]));

    for (const fieldDefinitionId of fieldDefinitionIds) {
      const field = fieldById.get(fieldDefinitionId);
      if (!field) {
        throw new BadRequestException(
          `Field ${fieldDefinitionId} does not exist or is not active for this school year`,
        );
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
      } else {
        const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
        const existing = await this.prisma.studentFieldValue.findFirst({
          where: { studentId, fieldDefinitionId },
        });
        if (existing) {
          await this.prisma.studentFieldValue.update({
            where: { id: existing.id },
            data: { value },
          });
        } else {
          await this.prisma.studentFieldValue.create({
            data: { studentId, fieldDefinitionId, value },
          });
        }
      }
    }
  }

  private async nextDisplayOrder(classId: string) {
    const last = await this.prisma.student.findFirst({
      where: { classId },
      orderBy: { displayOrder: 'desc' },
      select: { displayOrder: true },
    });
    return (last?.displayOrder ?? 0) + 1;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
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

  async findAll(query: QueryStudentsDto): Promise<Paginated<Student>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const where = buildStudentWhere(query);
    const orderBy = query.sortBy
      ? STUDENT_SORTABLE_FIELDS[query.sortBy](query.sortOrder ?? 'asc')
      : DEFAULT_STUDENT_SORT;

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

  async findOne(id: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: { class: true, fieldValues: { include: { fieldDefinition: true } } },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  private buildUpdateData(dto: UpdateStudentDto): Prisma.StudentUpdateInput {
    const names = this.resolveNameFields(dto);

    const data: Prisma.StudentUpdateInput = {
      ...names,
    };
    if (dto.classId !== undefined) data.class = { connect: { id: dto.classId } };
    if (dto.dateOfBirth !== undefined) data.dateOfBirth = this.toDateOrUndefined(dto.dateOfBirth);
    if (dto.gender !== undefined) data.gender = dto.gender;
    if (dto.identifier !== undefined) data.identifier = dto.identifier;
    if (dto.ethnicity !== undefined) data.ethnicity = dto.ethnicity;
    if (dto.nationality !== undefined) data.nationality = dto.nationality;
    if (dto.address !== undefined) data.address = dto.address;
    if (dto.studentPhone !== undefined) data.studentPhone = dto.studentPhone;
    if (dto.previousSchool !== undefined) data.previousSchool = dto.previousSchool;
    if (dto.status !== undefined) data.status = dto.status;
    if (dto.fatherName !== undefined) data.fatherName = dto.fatherName;
    if (dto.fatherPhone !== undefined) data.fatherPhone = dto.fatherPhone;
    if (dto.fatherJob !== undefined) data.fatherJob = dto.fatherJob;
    if (dto.fatherWorkplace !== undefined) data.fatherWorkplace = dto.fatherWorkplace;
    if (dto.motherName !== undefined) data.motherName = dto.motherName;
    if (dto.motherPhone !== undefined) data.motherPhone = dto.motherPhone;
    if (dto.motherJob !== undefined) data.motherJob = dto.motherJob;
    if (dto.motherWorkplace !== undefined) data.motherWorkplace = dto.motherWorkplace;
    if (dto.hasHealthInsurance !== undefined) data.hasHealthInsurance = dto.hasHealthInsurance;
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
    if (dto.policyCategory !== undefined) data.policyCategory = dto.policyCategory;
    if (dto.bloodType !== undefined) data.bloodType = dto.bloodType;
    if (dto.allergy !== undefined) data.allergy = dto.allergy;
    if (dto.healthNotes !== undefined) data.healthNotes = dto.healthNotes;
    if (dto.notes !== undefined) data.notes = dto.notes;

    return data;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
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

  async remove(id: string): Promise<Student> {
    await this.findOne(id);
    return this.prisma.student.delete({ where: { id } });
  }

  async reorder(dto: ReorderStudentsDto): Promise<{ success: true }> {
    const schoolYear = await this.prisma.schoolYear.findUnique({
      where: { id: dto.schoolYearId },
    });
    if (!schoolYear) {
      throw new BadRequestException('School year not found');
    }
    await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);

    const studentIds = dto.items.map((i) => i.studentId);
    const students = await this.prisma.student.findMany({
      where: { id: { in: studentIds } },
    });

    if (students.length !== studentIds.length) {
      throw new BadRequestException('One or more students were not found');
    }
    const unauthorized = students.find(
      (s) => s.schoolYearId !== dto.schoolYearId || s.classId !== dto.classId,
    );
    if (unauthorized) {
      throw new BadRequestException(
        'One or more students do not belong to the selected school year/class',
      );
    }

    await this.prisma.$transaction(
      dto.items.map((item) =>
        this.prisma.student.update({
          where: { id: item.studentId },
          data: { displayOrder: item.order },
        }),
      ),
    );

    return { success: true };
  }

  async bulkUpdate(dto: BulkUpdateStudentsDto): Promise<BulkUpdateResult> {
    const schoolYear = await this.prisma.schoolYear.findUnique({
      where: { id: dto.schoolYearId },
    });
    if (!schoolYear) {
      throw new BadRequestException('School year not found');
    }
    await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);

    const studentIds = dto.rows.map((r) => r.studentId);
    const students = await this.prisma.student.findMany({
      where: { id: { in: studentIds } },
    });
    const studentById = new Map(students.map((s) => [s.id, s]));

    const activeFields = await this.prisma.fieldDefinition.findMany({
      where: { schoolYearId: dto.schoolYearId, isActive: true },
    });
    const activeFieldById = new Map(activeFields.map((f) => [f.id, f]));

    const errors: BulkUpdateError[] = [];
    const preparedUpdates: Array<{ studentId: string; data: Prisma.StudentUpdateInput }> = [];
    const preparedCustomFields: Array<{
      studentId: string;
      customFields: Record<string, string | string[]>;
    }> = [];

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

      const { customFields, schoolYearId: _sy, classId: _c, ...rest } = row.values as any;
      const instance = plainToInstance(UpdateStudentDto, rest);
      const validationErrors = await validate(instance, {
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

      if (customFields && typeof customFields === 'object') {
        const unknownField = Object.keys(customFields).find((id) => !activeFieldById.has(id));
        if (unknownField) {
          errors.push({
            row: rowNumber,
            field: unknownField,
            message: 'Field does not exist or is not active for this school year',
          });
          continue;
        }
        preparedCustomFields.push({ studentId: row.studentId, customFields });
      }

      preparedUpdates.push({ studentId: row.studentId, data: this.buildUpdateData(instance) });
    }

    if (errors.length > 0) {
      return { success: false, updatedCount: 0, errors };
    }

    await this.prisma.$transaction(
      preparedUpdates.map((u) =>
        this.prisma.student.update({ where: { id: u.studentId }, data: u.data }),
      ),
    );

    for (const { studentId, customFields } of preparedCustomFields) {
      await this.setCustomFieldValues(studentId, dto.schoolYearId, customFields);
    }

    return { success: true, updatedCount: preparedUpdates.length, errors: [] };
  }

  async seedDemo(dto: SeedDemoStudentsDto): Promise<{ createdCount: number }> {
    await this.assertClassBelongsToSchoolYear(dto.classId, dto.schoolYearId);

    for (const seed of DEMO_STUDENTS) {
      await this.create({
        schoolYearId: dto.schoolYearId,
        classId: dto.classId,
        ...seed,
      });
    }

    return { createdCount: DEMO_STUDENTS.length };
  }
}

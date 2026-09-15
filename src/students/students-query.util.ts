import { Gender, Prisma, StudentStatus } from '@prisma/client';
import { STUDENT_SEARCHABLE_FIELDS } from './students.constants';

export interface StudentFilterParams {
  schoolYearId: string;
  classId?: string;
  search?: string;
  gender?: Gender;
  status?: StudentStatus;
  hasHealthInsurance?: boolean;
  ethnicity?: string;
  bloodType?: string;
  policyCategory?: string;
  dateOfBirthFrom?: string;
  dateOfBirthTo?: string;
}

export function buildStudentWhere(params: StudentFilterParams): Prisma.StudentWhereInput {
  const where: Prisma.StudentWhereInput = {
    schoolYearId: params.schoolYearId,
  };

  if (params.classId) {
    where.classId = params.classId;
  }
  if (params.gender) {
    where.gender = params.gender;
  }
  if (params.status) {
    where.status = params.status;
  }
  if (params.hasHealthInsurance !== undefined) {
    where.hasHealthInsurance = params.hasHealthInsurance;
  }
  if (params.ethnicity) {
    where.ethnicity = { contains: params.ethnicity, mode: 'insensitive' };
  }
  if (params.bloodType) {
    where.bloodType = { contains: params.bloodType, mode: 'insensitive' };
  }
  if (params.policyCategory) {
    where.policyCategory = { contains: params.policyCategory, mode: 'insensitive' };
  }
  if (params.dateOfBirthFrom || params.dateOfBirthTo) {
    where.dateOfBirth = {
      ...(params.dateOfBirthFrom ? { gte: new Date(params.dateOfBirthFrom) } : {}),
      ...(params.dateOfBirthTo ? { lte: new Date(params.dateOfBirthTo) } : {}),
    };
  }

  if (params.search) {
    where.OR = [
      ...STUDENT_SEARCHABLE_FIELDS.map(
        (field) =>
          ({
            [field]: { contains: params.search, mode: 'insensitive' },
          }) as Prisma.StudentWhereInput,
      ),
      // Custom fields (Thêm cột) are just as searchable as the built-in columns.
      {
        fieldValues: {
          some: { value: { contains: params.search, mode: 'insensitive' } },
        },
      },
    ];
  }

  return where;
}

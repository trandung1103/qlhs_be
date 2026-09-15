import { Gender, Prisma, StudentStatus } from '@prisma/client';
import { STUDENT_SEARCHABLE_FIELDS } from './students.constants';

export interface StudentFilterParams {
  schoolYearId: string;
  classId?: string;
  search?: string;
  gender?: Gender;
  status?: StudentStatus;
  hasHealthInsurance?: boolean;
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

  if (params.search) {
    where.OR = STUDENT_SEARCHABLE_FIELDS.map((field) => ({
      [field]: { contains: params.search, mode: 'insensitive' },
    })) as Prisma.StudentWhereInput[];
  }

  return where;
}

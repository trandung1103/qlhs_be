import { Gender, Prisma, StudentStatus } from '@prisma/client';
export interface StudentFilterParams {
    schoolYearId: string;
    classId?: string;
    search?: string;
    gender?: Gender;
    status?: StudentStatus;
    hasHealthInsurance?: boolean;
}
export declare function buildStudentWhere(params: StudentFilterParams): Prisma.StudentWhereInput;

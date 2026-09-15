import { Gender, StudentStatus } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class QueryStudentsDto extends PaginationQueryDto {
    schoolYearId: string;
    classId?: string;
    search?: string;
    gender?: Gender;
    status?: StudentStatus;
    hasHealthInsurance?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

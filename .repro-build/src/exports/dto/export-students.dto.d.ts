import { Gender, StudentStatus } from '@prisma/client';
declare class ExportSortDto {
    field: string;
    order: 'asc' | 'desc';
}
declare class ExportFiltersDto {
    gender?: Gender;
    status?: StudentStatus;
    hasHealthInsurance?: boolean;
}
export declare class ExportStudentsDto {
    schoolYearId: string;
    classId?: string;
    fields: string[];
    search?: string;
    filters?: ExportFiltersDto;
    sort?: ExportSortDto;
}
export {};

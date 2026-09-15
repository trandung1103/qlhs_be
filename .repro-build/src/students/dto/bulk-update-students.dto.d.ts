declare class BulkUpdateRowDto {
    studentId: string;
    values: Record<string, unknown>;
}
export declare class BulkUpdateStudentsDto {
    schoolYearId: string;
    classId: string;
    rows: BulkUpdateRowDto[];
}
export interface BulkUpdateError {
    row: number;
    field: string;
    message: string;
}
export interface BulkUpdateResult {
    success: boolean;
    updatedCount: number;
    errors: BulkUpdateError[];
}
export {};

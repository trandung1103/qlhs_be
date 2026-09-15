declare class ReorderItemDto {
    studentId: string;
    order: number;
}
export declare class ReorderStudentsDto {
    schoolYearId: string;
    classId: string;
    items: ReorderItemDto[];
}
export {};

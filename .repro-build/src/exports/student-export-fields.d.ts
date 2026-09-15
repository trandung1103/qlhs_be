import { Student, Class } from '@prisma/client';
type StudentWithClass = Student & {
    class?: Class | null;
};
export declare const STUDENT_EXPORT_FIELDS: Record<string, {
    header: string;
    getValue: (student: StudentWithClass) => string | number;
}>;
export declare const CUSTOM_FIELD_PREFIX = "customField:";
export {};

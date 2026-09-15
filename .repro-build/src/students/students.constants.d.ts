import { Prisma } from '@prisma/client';
export declare const STUDENT_SORTABLE_FIELDS: Record<string, (order: 'asc' | 'desc') => Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[]>;
export declare const DEFAULT_STUDENT_SORT: Prisma.StudentOrderByWithRelationInput;
export declare const STUDENT_SEARCHABLE_FIELDS: Array<keyof Prisma.StudentWhereInput>;

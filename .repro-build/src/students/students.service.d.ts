import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { Paginated } from '../common/dto/pagination-query.dto';
import { BulkUpdateStudentsDto, BulkUpdateResult } from './dto/bulk-update-students.dto';
import { ReorderStudentsDto } from './dto/reorder-students.dto';
import { SeedDemoStudentsDto } from './dto/seed-demo-students.dto';
import { Student } from '@prisma/client';
export declare class StudentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private resolveNameFields;
    private assertClassBelongsToSchoolYear;
    private toDateOrUndefined;
    private setCustomFieldValues;
    private nextDisplayOrder;
    create(dto: CreateStudentDto): Promise<Student>;
    findAll(query: QueryStudentsDto): Promise<Paginated<Student>>;
    findOne(id: string): Promise<Student>;
    private buildUpdateData;
    update(id: string, dto: UpdateStudentDto): Promise<Student>;
    remove(id: string): Promise<Student>;
    reorder(dto: ReorderStudentsDto): Promise<{
        success: true;
    }>;
    bulkUpdate(dto: BulkUpdateStudentsDto): Promise<BulkUpdateResult>;
    seedDemo(dto: SeedDemoStudentsDto): Promise<{
        createdCount: number;
    }>;
}

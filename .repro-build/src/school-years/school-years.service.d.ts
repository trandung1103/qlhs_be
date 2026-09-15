import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';
export declare class SchoolYearsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSchoolYearDto): import(".prisma/client").Prisma.Prisma__SchoolYearClient<{
        name: string;
        startYear: number;
        endYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        startYear: number;
        endYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        startYear: number;
        endYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateSchoolYearDto): Promise<{
        name: string;
        startYear: number;
        endYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        startYear: number;
        endYear: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

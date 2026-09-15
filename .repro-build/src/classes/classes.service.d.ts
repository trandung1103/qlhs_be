import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateClassDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
    }>;
    findAll(schoolYearId: string): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
    }>;
    update(id: string, dto: UpdateClassDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
    }>;
}

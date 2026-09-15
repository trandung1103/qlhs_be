import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { QueryClassesDto } from './dto/query-classes.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    create(dto: CreateClassDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
    }>;
    findAll(query: QueryClassesDto): import(".prisma/client").Prisma.PrismaPromise<{
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

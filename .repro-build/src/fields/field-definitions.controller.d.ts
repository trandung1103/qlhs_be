import { FieldDefinitionsService } from './field-definitions.service';
import { CreateFieldDefinitionDto } from './dto/create-field-definition.dto';
import { UpdateFieldDefinitionDto } from './dto/update-field-definition.dto';
import { QueryFieldDefinitionsDto } from './dto/query-field-definitions.dto';
export declare class FieldDefinitionsController {
    private readonly fieldDefinitionsService;
    constructor(fieldDefinitionsService: FieldDefinitionsService);
    create(dto: CreateFieldDefinitionDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
        displayOrder: number;
        key: string;
        type: import(".prisma/client").$Enums.FieldType;
        isSystem: boolean;
        isRequired: boolean;
        isVisible: boolean;
        isSearchable: boolean;
        isSortable: boolean;
        isActive: boolean;
    }>;
    findAll(query: QueryFieldDefinitionsDto): import(".prisma/client").Prisma.PrismaPromise<({
        options: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            displayOrder: number;
            value: string;
            isActive: boolean;
            fieldDefinitionId: string;
            label: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
        displayOrder: number;
        key: string;
        type: import(".prisma/client").$Enums.FieldType;
        isSystem: boolean;
        isRequired: boolean;
        isVisible: boolean;
        isSearchable: boolean;
        isSortable: boolean;
        isActive: boolean;
    })[]>;
    findOne(id: string): Promise<{
        options: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            displayOrder: number;
            value: string;
            isActive: boolean;
            fieldDefinitionId: string;
            label: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
        displayOrder: number;
        key: string;
        type: import(".prisma/client").$Enums.FieldType;
        isSystem: boolean;
        isRequired: boolean;
        isVisible: boolean;
        isSearchable: boolean;
        isSortable: boolean;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateFieldDefinitionDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
        displayOrder: number;
        key: string;
        type: import(".prisma/client").$Enums.FieldType;
        isSystem: boolean;
        isRequired: boolean;
        isVisible: boolean;
        isSearchable: boolean;
        isSortable: boolean;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        schoolYearId: string;
        displayOrder: number;
        key: string;
        type: import(".prisma/client").$Enums.FieldType;
        isSystem: boolean;
        isRequired: boolean;
        isVisible: boolean;
        isSearchable: boolean;
        isSortable: boolean;
        isActive: boolean;
    }>;
}

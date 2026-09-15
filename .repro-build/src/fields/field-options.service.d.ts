import { PrismaService } from '../prisma/prisma.service';
import { CreateFieldOptionDto } from './dto/create-field-option.dto';
import { UpdateFieldOptionDto } from './dto/update-field-option.dto';
export declare class FieldOptionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertFieldExists;
    create(fieldDefinitionId: string, dto: CreateFieldOptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }>;
    findAll(fieldDefinitionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }[]>;
    private findOneOrThrow;
    update(fieldDefinitionId: string, optionId: string, dto: UpdateFieldOptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }>;
    remove(fieldDefinitionId: string, optionId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }>;
}

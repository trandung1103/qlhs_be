import { FieldOptionsService } from './field-options.service';
import { CreateFieldOptionDto } from './dto/create-field-option.dto';
import { UpdateFieldOptionDto } from './dto/update-field-option.dto';
export declare class FieldOptionsController {
    private readonly fieldOptionsService;
    constructor(fieldOptionsService: FieldOptionsService);
    create(fieldId: string, dto: CreateFieldOptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }>;
    findAll(fieldId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }[]>;
    update(fieldId: string, optionId: string, dto: UpdateFieldOptionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        displayOrder: number;
        value: string;
        isActive: boolean;
        fieldDefinitionId: string;
        label: string;
    }>;
    remove(fieldId: string, optionId: string): Promise<{
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

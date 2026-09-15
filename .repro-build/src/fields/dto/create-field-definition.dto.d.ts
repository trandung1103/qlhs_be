import { FieldType } from '@prisma/client';
export declare class CreateFieldDefinitionDto {
    schoolYearId: string;
    name: string;
    type: FieldType;
    isRequired?: boolean;
    isVisible?: boolean;
    isSearchable?: boolean;
    isSortable?: boolean;
    displayOrder?: number;
}

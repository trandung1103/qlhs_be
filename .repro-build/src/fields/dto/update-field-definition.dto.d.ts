import { CreateFieldDefinitionDto } from './create-field-definition.dto';
declare const UpdateFieldDefinitionDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateFieldDefinitionDto, "schoolYearId" | "type">>>;
export declare class UpdateFieldDefinitionDto extends UpdateFieldDefinitionDto_base {
    isActive?: boolean;
}
export {};

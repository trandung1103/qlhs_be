import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateFieldDefinitionDto } from './create-field-definition.dto';

export class UpdateFieldDefinitionDto extends PartialType(
  OmitType(CreateFieldDefinitionDto, ['schoolYearId', 'type'] as const),
) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

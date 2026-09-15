import { FieldType } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFieldDefinitionDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FieldType)
  type: FieldType;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @IsOptional()
  @IsBoolean()
  isSearchable?: boolean;

  @IsOptional()
  @IsBoolean()
  isSortable?: boolean;

  @IsOptional()
  @IsInt()
  displayOrder?: number;
}

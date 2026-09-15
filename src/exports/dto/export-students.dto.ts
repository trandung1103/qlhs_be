import { Gender, StudentStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { STUDENT_SORTABLE_FIELDS } from '../../students/students.constants';

class ExportSortDto {
  @IsIn(Object.keys(STUDENT_SORTABLE_FIELDS))
  field: string;

  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';
}

class ExportFiltersDto {
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @IsOptional()
  @IsBoolean()
  hasHealthInsurance?: boolean;
}

export class ExportStudentsDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsOptional()
  @IsString()
  classId?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  fields: string[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExportFiltersDto)
  filters?: ExportFiltersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExportSortDto)
  sort?: ExportSortDto;
}

import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class BulkUpdateRowDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsObject()
  values: Record<string, unknown>;
}

export class BulkUpdateStudentsDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BulkUpdateRowDto)
  rows: BulkUpdateRowDto[];
}

export interface BulkUpdateError {
  row: number;
  field: string;
  message: string;
}

export interface BulkUpdateResult {
  success: boolean;
  updatedCount: number;
  errors: BulkUpdateError[];
}

import { Gender, StudentStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { STUDENT_SORTABLE_FIELDS } from '../students.constants';

const toBoolean = ({ value }: { value: unknown }) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
};

export class QueryStudentsDto extends PaginationQueryDto {
  @IsString()
  schoolYearId: string;

  @IsOptional()
  @IsString()
  classId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(StudentStatus)
  status?: StudentStatus;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  hasHealthInsurance?: boolean;

  // Omitted -> the teacher-defined manual order (displayOrder ASC) is used.
  @IsOptional()
  @IsIn(Object.keys(STUDENT_SORTABLE_FIELDS))
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';
}

import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';

class ReorderItemDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsInt()
  @Min(1)
  order: number;
}

export class ReorderStudentsDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderItemDto)
  items: ReorderItemDto[];
}

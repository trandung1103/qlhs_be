import { IsNotEmpty, IsString } from 'class-validator';

export class SeedDemoStudentsDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;
}

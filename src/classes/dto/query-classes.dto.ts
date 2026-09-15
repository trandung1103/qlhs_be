import { IsNotEmpty, IsString } from 'class-validator';

export class QueryClassesDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;
}

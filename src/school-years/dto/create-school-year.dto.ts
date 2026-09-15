import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateSchoolYearDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(2000)
  @Max(2100)
  startYear: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  endYear: number;
}

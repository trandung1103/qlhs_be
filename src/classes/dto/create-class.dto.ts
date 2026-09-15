import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

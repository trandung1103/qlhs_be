import { IsNotEmpty, IsString } from 'class-validator';

export class QueryFieldDefinitionsDto {
  @IsString()
  @IsNotEmpty()
  schoolYearId: string;
}

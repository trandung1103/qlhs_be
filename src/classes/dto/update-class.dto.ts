import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}

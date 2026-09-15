import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFieldOptionDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;
}

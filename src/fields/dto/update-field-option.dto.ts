import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateFieldOptionDto } from './create-field-option.dto';

export class UpdateFieldOptionDto extends PartialType(CreateFieldOptionDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FieldOptionsService } from './field-options.service';
import { CreateFieldOptionDto } from './dto/create-field-option.dto';
import { UpdateFieldOptionDto } from './dto/update-field-option.dto';

@Controller('fields/:fieldId/options')
export class FieldOptionsController {
  constructor(private readonly fieldOptionsService: FieldOptionsService) {}

  @Post()
  create(@Param('fieldId') fieldId: string, @Body() dto: CreateFieldOptionDto) {
    return this.fieldOptionsService.create(fieldId, dto);
  }

  @Get()
  findAll(@Param('fieldId') fieldId: string) {
    return this.fieldOptionsService.findAll(fieldId);
  }

  @Patch(':optionId')
  update(
    @Param('fieldId') fieldId: string,
    @Param('optionId') optionId: string,
    @Body() dto: UpdateFieldOptionDto,
  ) {
    return this.fieldOptionsService.update(fieldId, optionId, dto);
  }

  @Delete(':optionId')
  remove(@Param('fieldId') fieldId: string, @Param('optionId') optionId: string) {
    return this.fieldOptionsService.remove(fieldId, optionId);
  }
}

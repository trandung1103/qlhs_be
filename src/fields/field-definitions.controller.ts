import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FieldDefinitionsService } from './field-definitions.service';
import { CreateFieldDefinitionDto } from './dto/create-field-definition.dto';
import { UpdateFieldDefinitionDto } from './dto/update-field-definition.dto';
import { QueryFieldDefinitionsDto } from './dto/query-field-definitions.dto';

@Controller('fields')
export class FieldDefinitionsController {
  constructor(private readonly fieldDefinitionsService: FieldDefinitionsService) {}

  @Post()
  create(@Body() dto: CreateFieldDefinitionDto) {
    return this.fieldDefinitionsService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryFieldDefinitionsDto) {
    return this.fieldDefinitionsService.findAll(query.schoolYearId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldDefinitionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFieldDefinitionDto) {
    return this.fieldDefinitionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldDefinitionsService.remove(id);
  }
}

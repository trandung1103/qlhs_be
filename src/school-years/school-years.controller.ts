import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SchoolYearsService } from './school-years.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';

@Controller('school-years')
export class SchoolYearsController {
  constructor(private readonly schoolYearsService: SchoolYearsService) {}

  @Post()
  create(@Body() dto: CreateSchoolYearDto) {
    return this.schoolYearsService.create(dto);
  }

  @Get()
  findAll() {
    return this.schoolYearsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolYearsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSchoolYearDto) {
    return this.schoolYearsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolYearsService.remove(id);
  }
}

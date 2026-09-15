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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { ReorderStudentsDto } from './dto/reorder-students.dto';
import { BulkUpdateStudentsDto } from './dto/bulk-update-students.dto';
import { SeedDemoStudentsDto } from './dto/seed-demo-students.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryStudentsDto) {
    return this.studentsService.findAll(query);
  }

  @Post('bulk-update')
  bulkUpdate(@Body() dto: BulkUpdateStudentsDto) {
    return this.studentsService.bulkUpdate(dto);
  }

  @Post('seed-demo')
  seedDemo(@Body() dto: SeedDemoStudentsDto) {
    return this.studentsService.seedDemo(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderStudentsDto) {
    return this.studentsService.reorder(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}

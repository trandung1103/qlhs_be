import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportsService } from './exports.service';
import { ExportStudentsDto } from './dto/export-students.dto';

@Controller('students/export')
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Post()
  async export(@Body() dto: ExportStudentsDto, @Res() res: Response) {
    const buffer = await this.exportsService.exportStudents(dto);

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="danh-sach-hoc-sinh.xlsx"',
    });
    res.send(buffer);
  }
}

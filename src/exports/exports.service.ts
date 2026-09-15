import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { PrismaService } from '../prisma/prisma.service';
import { ExportStudentsDto } from './dto/export-students.dto';
import { buildStudentWhere } from '../students/students-query.util';
import { STUDENT_SORTABLE_FIELDS } from '../students/students.constants';
import { CUSTOM_FIELD_PREFIX, STUDENT_EXPORT_FIELDS } from './student-export-fields';

interface ResolvedColumn {
  header: string;
  getValue: (student: any) => string | number;
}

@Injectable()
export class ExportsService {
  constructor(private readonly prisma: PrismaService) {}

  private async resolveColumns(
    fields: string[],
    schoolYearId: string,
  ): Promise<ResolvedColumn[]> {
    const customFieldIds = fields
      .filter((f) => f.startsWith(CUSTOM_FIELD_PREFIX))
      .map((f) => f.slice(CUSTOM_FIELD_PREFIX.length));

    const customFieldDefs = customFieldIds.length
      ? await this.prisma.fieldDefinition.findMany({
          where: { id: { in: customFieldIds }, schoolYearId },
          include: { options: true },
        })
      : [];
    const customFieldById = new Map(customFieldDefs.map((f) => [f.id, f]));

    return fields.map((field) => {
      if (field.startsWith(CUSTOM_FIELD_PREFIX)) {
        const id = field.slice(CUSTOM_FIELD_PREFIX.length);
        const def = customFieldById.get(id);
        if (!def) {
          throw new BadRequestException(`Custom field ${id} not found for this school year`);
        }
        const optionLabelByValue = new Map(def.options.map((o) => [o.value, o.label]));
        return {
          header: def.name,
          getValue: (student: any) => {
            const values = (student.fieldValues ?? [])
              .filter((v: any) => v.fieldDefinitionId === id)
              .map((v: any) => optionLabelByValue.get(v.value ?? '') ?? v.value ?? '');
            return values.join(', ');
          },
        };
      }

      const systemField = STUDENT_EXPORT_FIELDS[field];
      if (!systemField) {
        throw new BadRequestException(`Unknown export field: ${field}`);
      }
      return systemField;
    });
  }

  async exportStudents(dto: ExportStudentsDto): Promise<ExcelJS.Buffer> {
    const schoolYear = await this.prisma.schoolYear.findUnique({
      where: { id: dto.schoolYearId },
    });
    if (!schoolYear) {
      throw new BadRequestException('School year not found');
    }

    if (dto.classId) {
      const cls = await this.prisma.class.findUnique({ where: { id: dto.classId } });
      if (!cls || cls.schoolYearId !== dto.schoolYearId) {
        throw new BadRequestException('Class does not belong to the selected school year');
      }
    }

    const columns = await this.resolveColumns(dto.fields, dto.schoolYearId);

    const where = buildStudentWhere({
      schoolYearId: dto.schoolYearId,
      classId: dto.classId,
      search: dto.search,
      gender: dto.filters?.gender,
      status: dto.filters?.status,
      hasHealthInsurance: dto.filters?.hasHealthInsurance,
    });

    const orderBy = dto.sort
      ? STUDENT_SORTABLE_FIELDS[dto.sort.field](dto.sort.order)
      : { createdAt: 'desc' as const };

    const needsFieldValues = dto.fields.some((f) => f.startsWith(CUSTOM_FIELD_PREFIX));

    const students = await this.prisma.student.findMany({
      where,
      orderBy,
      include: {
        class: true,
        ...(needsFieldValues ? { fieldValues: true } : {}),
      },
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Học sinh');

    sheet.columns = columns.map((c) => ({ header: c.header, key: c.header, width: 22 }));
    sheet.getRow(1).font = { bold: true };

    for (const student of students) {
      const row: Record<string, string | number> = {};
      for (const column of columns) {
        row[column.header] = column.getValue(student);
      }
      sheet.addRow(row);
    }

    return workbook.xlsx.writeBuffer();
  }
}

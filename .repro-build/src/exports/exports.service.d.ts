import * as ExcelJS from 'exceljs';
import { PrismaService } from '../prisma/prisma.service';
import { ExportStudentsDto } from './dto/export-students.dto';
export declare class ExportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private resolveColumns;
    exportStudents(dto: ExportStudentsDto): Promise<ExcelJS.Buffer>;
}

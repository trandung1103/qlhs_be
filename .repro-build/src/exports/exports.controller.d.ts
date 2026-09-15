import { Response } from 'express';
import { ExportsService } from './exports.service';
import { ExportStudentsDto } from './dto/export-students.dto';
export declare class ExportsController {
    private readonly exportsService;
    constructor(exportsService: ExportsService);
    export(dto: ExportStudentsDto, res: Response): Promise<void>;
}

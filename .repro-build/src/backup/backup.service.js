"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BackupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const google_drive_service_1 = require("./google-drive.service");
let BackupService = BackupService_1 = class BackupService {
    constructor(prisma, drive) {
        this.prisma = prisma;
        this.drive = drive;
        this.logger = new common_1.Logger(BackupService_1.name);
    }
    async runIfChanged() {
        if (!this.drive.isConfigured()) {
            return { ran: false, reason: 'Google Drive is not configured' };
        }
        const [latestChange, log] = await Promise.all([
            this.getLatestChangeTimestamp(),
            this.prisma.backupLog.upsert({
                where: { id: 'singleton' },
                update: {},
                create: { id: 'singleton' },
            }),
        ]);
        if (!latestChange) {
            return { ran: false, reason: 'No data yet' };
        }
        if (log.lastBackupAt && latestChange <= log.lastBackupAt) {
            return { ran: false, reason: 'No changes since last backup' };
        }
        const data = await this.exportAllData();
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.drive.uploadJson(`backup-${stamp}.json`, JSON.stringify(data, null, 2));
        await this.prisma.backupLog.update({
            where: { id: 'singleton' },
            data: { lastBackupAt: latestChange },
        });
        this.logger.log('Backup uploaded to Google Drive');
        return { ran: true };
    }
    async exportAllData() {
        const [schoolYears, classes, students, fieldDefinitions, fieldOptions, studentFieldValues,] = await Promise.all([
            this.prisma.schoolYear.findMany(),
            this.prisma.class.findMany(),
            this.prisma.student.findMany(),
            this.prisma.fieldDefinition.findMany(),
            this.prisma.fieldOption.findMany(),
            this.prisma.studentFieldValue.findMany(),
        ]);
        return {
            exportedAt: new Date().toISOString(),
            schoolYears,
            classes,
            students,
            fieldDefinitions,
            fieldOptions,
            studentFieldValues,
        };
    }
    async getLatestChangeTimestamp() {
        const [schoolYear, klass, student, fieldDefinition, fieldOption, fieldValue,] = await Promise.all([
            this.prisma.schoolYear.aggregate({ _max: { updatedAt: true } }),
            this.prisma.class.aggregate({ _max: { updatedAt: true } }),
            this.prisma.student.aggregate({ _max: { updatedAt: true } }),
            this.prisma.fieldDefinition.aggregate({ _max: { updatedAt: true } }),
            this.prisma.fieldOption.aggregate({ _max: { updatedAt: true } }),
            this.prisma.studentFieldValue.aggregate({ _max: { updatedAt: true } }),
        ]);
        const timestamps = [
            schoolYear._max.updatedAt,
            klass._max.updatedAt,
            student._max.updatedAt,
            fieldDefinition._max.updatedAt,
            fieldOption._max.updatedAt,
            fieldValue._max.updatedAt,
        ].filter((d) => d !== null);
        if (timestamps.length === 0)
            return null;
        return new Date(Math.max(...timestamps.map((d) => d.getTime())));
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = BackupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        google_drive_service_1.GoogleDriveService])
], BackupService);
//# sourceMappingURL=backup.service.js.map
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from './google-drive.service';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly drive: GoogleDriveService,
  ) {}

  async runIfChanged(): Promise<{ ran: boolean; reason?: string }> {
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
    await this.drive.uploadJson(
      `backup-${stamp}.json`,
      JSON.stringify(data, null, 2),
    );

    await this.prisma.backupLog.update({
      where: { id: 'singleton' },
      data: { lastBackupAt: latestChange },
    });

    this.logger.log('Backup uploaded to Google Drive');
    return { ran: true };
  }

  private async exportAllData() {
    const [
      schoolYears,
      classes,
      students,
      fieldDefinitions,
      fieldOptions,
      studentFieldValues,
    ] = await Promise.all([
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

  private async getLatestChangeTimestamp(): Promise<Date | null> {
    const [
      schoolYear,
      klass,
      student,
      fieldDefinition,
      fieldOption,
      fieldValue,
    ] = await Promise.all([
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
    ].filter((d): d is Date => d !== null);

    if (timestamps.length === 0) return null;
    return new Date(Math.max(...timestamps.map((d) => d.getTime())));
  }
}

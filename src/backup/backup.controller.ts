import {
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  // Meant to be called by an external cron pinger (e.g. cron-job.org) every
  // few minutes, since Vercel serverless functions can't run an in-process
  // scheduler. Skips the actual export/upload when nothing changed.
  @Post('run')
  async run(@Headers('x-backup-secret') secret: string) {
    const expected = process.env.BACKUP_SECRET;
    if (!expected || secret !== expected) {
      throw new UnauthorizedException();
    }
    return this.backupService.runIfChanged();
  }
}

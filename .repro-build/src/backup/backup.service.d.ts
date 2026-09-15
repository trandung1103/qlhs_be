import { PrismaService } from '../prisma/prisma.service';
import { GoogleDriveService } from './google-drive.service';
export declare class BackupService {
    private readonly prisma;
    private readonly drive;
    private readonly logger;
    constructor(prisma: PrismaService, drive: GoogleDriveService);
    runIfChanged(): Promise<{
        ran: boolean;
        reason?: string;
    }>;
    private exportAllData;
    private getLatestChangeTimestamp;
}

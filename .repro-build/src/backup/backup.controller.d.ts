import { BackupService } from './backup.service';
export declare class BackupController {
    private readonly backupService;
    constructor(backupService: BackupService);
    run(secret: string): Promise<{
        ran: boolean;
        reason?: string;
    }>;
}

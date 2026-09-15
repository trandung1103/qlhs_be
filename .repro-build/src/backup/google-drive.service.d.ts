export declare class GoogleDriveService {
    private readonly logger;
    isConfigured(): boolean;
    private getClient;
    uploadJson(fileName: string, content: string): Promise<string>;
}

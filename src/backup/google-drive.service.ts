import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private readonly logger = new Logger(GoogleDriveService.name);

  isConfigured(): boolean {
    return Boolean(
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN &&
      process.env.GOOGLE_DRIVE_FOLDER_ID,
    );
  }

  private getClient() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    return google.drive({ version: 'v3', auth: oauth2Client });
  }

  async uploadJson(fileName: string, content: string): Promise<string> {
    const drive = this.getClient();
    const res = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID as string],
      },
      media: {
        mimeType: 'application/json',
        body: Readable.from(content),
      },
      fields: 'id',
    });

    const fileId = res.data.id as string;
    this.logger.log(
      `Uploaded backup ${fileName} to Google Drive (id: ${fileId})`,
    );
    return fileId;
  }
}

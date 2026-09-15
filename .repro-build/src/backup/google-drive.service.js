"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoogleDriveService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
let GoogleDriveService = GoogleDriveService_1 = class GoogleDriveService {
    constructor() {
        this.logger = new common_1.Logger(GoogleDriveService_1.name);
    }
    isConfigured() {
        return Boolean(process.env.GOOGLE_CLIENT_ID &&
            process.env.GOOGLE_CLIENT_SECRET &&
            process.env.GOOGLE_REFRESH_TOKEN &&
            process.env.GOOGLE_DRIVE_FOLDER_ID);
    }
    getClient() {
        const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });
        return googleapis_1.google.drive({ version: 'v3', auth: oauth2Client });
    }
    async uploadJson(fileName, content) {
        const drive = this.getClient();
        const res = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
            },
            media: {
                mimeType: 'application/json',
                body: stream_1.Readable.from(content),
            },
            fields: 'id',
        });
        const fileId = res.data.id;
        this.logger.log(`Uploaded backup ${fileName} to Google Drive (id: ${fileId})`);
        return fileId;
    }
};
exports.GoogleDriveService = GoogleDriveService;
exports.GoogleDriveService = GoogleDriveService = GoogleDriveService_1 = __decorate([
    (0, common_1.Injectable)()
], GoogleDriveService);
//# sourceMappingURL=google-drive.service.js.map
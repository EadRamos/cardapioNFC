require('dotenv').config();
const fs = require('fs');
const { google } = require('googleapis');
const { Readable } = require('stream');


class GoogleDriveService { 
    constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFile: 'src/config/key-drive.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        this.drive = google.drive({version: 'v3', auth: this.auth});
        this.folderId = process.env.GOOGLE_FOLDER_ID;
    }

    async uploadFile(fileName, fileBuffer, mimeType) {
        try {
            const fileMetadata = {
                name: fileName,
                parents: [this.folderId]
            };

            const bufferStream = new Readable();
            bufferStream.push(fileBuffer);
            bufferStream.push(null);

            const media = {
                mimeType,
                body: bufferStream,
            };

            const response = await this.drive.files.create({
                requestBody: fileMetadata,
                media: media, 
            });

            const fileId = response.data.id;

            await this.drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone',
                }
            });

            return `https://lh3.googleusercontent.com/d/${fileId}`;
        } catch (error) {
            console.error('Erro ao fazer upload ao drive: ', error);
            throw new Error(error);
        }
    }
}

module.exports = GoogleDriveService;
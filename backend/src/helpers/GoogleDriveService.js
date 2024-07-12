const Readable = require("stream").Readable;
const stream = require("stream");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { file } = require("googleapis/build/src/apis/file");

class GoogleDriveService{
    constructor(){
        this.driveClient;
    }

    createDriveClient(clientId, clientSecret, redirectUri, refreshToken){
        const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

        client.setCredentials({ refresh_token:refreshToken });

        this.driveClient=google.drive({
            version: "v3",
            auth: client,
        });
    }

    createFolder(folderName){
        return new Promise((resolve, reject) => {
            this.driveClient.files.list(
                {
                    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
                    fields: "files(id, name)",
                },
                (err, res) => {
                    if(err){
                        return reject(err);
                    }

                    return resolve(res.data.files ? res.data.files[0] : null);
                }
            );
        });
    }

    searchInParent(folderID){
        return new Promise((resolve, reject) => {
            this.driveClient.files.list(
                {
                    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
                    fields: "files(id, name)",
                },
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res.data.files ? res.data.files : null);
                }
            );
        });
    }

    bufferToStream(buffer){
        var stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        return stream;
    }

    saveFile(fileName, fileBuffer, fileMimeType, folderId){
        return this.driveClient.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType,
                parents: folderId ? [folderId] : [],
            },
            media: {
                mimeType: fileMimeType,
                body: this.bufferToStream(fileBuffer),
            },
        });
    }

    saveFileFromLocal(fileName, filePath, fileMimeType, folderId){
        return this.driveClient.files.create({
            requestBody: {
                name: fileName,
                mimeType: fileMimeType,
                parents: folderId ? [folderId] : [],
            },
            media: {
                mimeType: fileMimeType,
                body: fs.createReadStream(filePath),
            },
        });
    }

    async deleteFileFromFolder(folder_id, filename){
        let files = await this.driveClient.files.list({
            q: "'" + folder_id + "' in parents",
            fields: "files(id, name, mimeType)",
        });
        files = files.data.files.filter((file) => files.name.includes(filename));
        if(files.length > 0){
            for(let i = 0; i < files.length; i++){
                await this.driveClient.files.delete({
                    fileId: files[i].id,
                });
            }
        }
    }

    deleteFile(fileId){
        return this.driveClient.files.delete({fileId:fileId});
    }

    updatePermission(fileId, role, type){
        return this.driveClient.permissions.create({
            fileId:fileId,
            requestBody:{
                role:role,
                type:type,
            },
        });
    }
}

let driveService = new GoogleDriveService();
const initDriveService = () => {
    driveService.createDriveClient(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.OAUTH_SCOPE_CALLBACK,
        process.env.OAUTH_REFRESH_TOKEN
    );
};

module.exports = {driveService,initDriveService};
/* istanbul ignore file */
import path               from 'path';
import uuid               from 'uuid';
import Base               from '../../Base.mjs';
import minioClient, { BucketName } from '../../../infrastructure/minio.mjs';
import {
    Exception as X
} from '../../../../packages.mjs';

const MIME_TYPE_RULES = {
    images : { 'one_of': [ 'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml' ] },
    chat   : { 'one_of' : [
        'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',        // .doc + .docx
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',        // .xls + .xlsx
        'application/x-rar-compressed', 'application/octet-stream',                                             // .rar
        'application/zip', 'application/octet-stream', 'application/x-zip-compressed', 'application/x-zip',     // .zip
        'application/pdf', 'text/plain', 'text/csv'
    ] }
};

export default class FileCreate extends Base {
    async validate(data) {
        const rules = {
            type     : [ 'required', { 'one_of': [ 'images', 'chat' ] } ],
            file     : [ 'required' ],
            filename : [ 'required' ],
            mimetype : [ 'required', MIME_TYPE_RULES[data.type] || 'not_empty' ]
        };

        return this.doValidation(data, rules);
    }

    async execute({ type, file, filename, mimetype }) {
        const extention      = path.extname(filename);
        const remoteFileName = `${uuid.v4()}${extention}`;

        try {
            await minioClient.uploadAsync(
                BucketName,
                `${type}/${remoteFileName}`,
                file,
                { ContentType: mimetype }
            );

            const storedFile = ({
                name         : remoteFileName,
                originalName : filename,
                key          : `/${BucketName}/${type}/${remoteFileName}`,
                location     : BucketName,
                extention,
                type
            });

            return { data: storedFile };
        } catch (error) {
            throw new X({
                code   : error,
                fields : {
                    file : 'BAD_FILE'
                }
            });
        }
    }
}

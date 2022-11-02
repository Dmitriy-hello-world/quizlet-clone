/* eslint-disable no-return-await */
import { DataTypes as DT } from '../../packages.mjs';
import minioClient, { BucketName } from '../infrastructure/minio.mjs';
import Base from './Base.mjs';
import Module from './Module.mjs';

class Word extends Base {
    static schema = {
        id         : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        moduleId   : { type: DT.UUID, allowNull: false  },
        term       : { type: DT.STRING, allowNull: false },
        definition : { type: DT.TEXT('medium'), allowNull: false },
        imageUrl   : { type: DT.STRING },
        repeatAt   : { type: DT.DATE, allowNull: true, defaultValue: DT.NOW }
    }

    static initRelations() {
        this.belongsTo(Module);
    }

    static initHooks() {
        this.afterDestroy(async (word) => {
            if (!word?.imageUrl) return;
            const file = word?.imageUrl?.replace(`${BucketName}/`, '');

            await minioClient.deleteAsync(BucketName, file);
        });

        this.afterUpdate(async (word) => {
            if (word._previousDataValues.imageUrl && word.dataValues.imageUrl !== word._previousDataValues.imageUrl) {
                const file = word._previousDataValues.imageUrl?.replace(`${BucketName}/`, '');

                await minioClient.deleteAsync(BucketName, file);
            }
        })
    }
}

export default Word;

import { DataTypes as DT } from '../../packages.mjs';
import Base from './Base.mjs';
import Word from './Word.mjs';
import User from './User.mjs';

class Module extends Base {
    static schema = {
        id                : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        userId            : { type: DT.UUID, unique: true, allowNull: false },
        name              : { type: DT.STRING, allowNull: false },
        description       : { type: DT.TINYTEXT, allowNull: true },
        private           : { type: DT.BOOL, defaultValue: true },
        editedByOutsiders : { type: DT.BOOL, defaultValue: false }
    }

    static initRelations() {
        this.belongsTo(User);
        this.hasMany(Word, { foreignKey: 'moduleId', onDelete: 'CASCADE' });
    }
}

export default Module;

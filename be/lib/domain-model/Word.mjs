import { DataTypes as DT } from '../../packages.mjs';
import Base from './Base.mjs';
import Module from './Module.mjs';

class Word extends Base {
    static schema = {
        id         : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        moduleId   : { type: DT.UUID, allowNull: false  },
        term       : { type: DT.STRING, allowNull: false },
        definition : { type: DT.STRING, allowNull: false },
        imageUrl   : { type: DT.STRING },
        repeatAt   : { type: DT.DATE, allowNull: true, defaultValue: DT.NOW }
    }

    static initRelations() {
        this.belongsTo(Module);
    }
}

export default Word;

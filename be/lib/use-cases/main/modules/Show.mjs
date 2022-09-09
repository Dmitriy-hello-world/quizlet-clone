import {
    Exception as X
} from '../../../../packages.mjs';
import Base         from '../../Base.mjs';
import { dumpModule } from '../../utils/dumps.mjs';
import Module       from '../../../domain-model/Module.mjs';
import Word         from '../../../domain-model/Word.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class UsersShow extends Base {
    static validationRules = {
        id : [ 'required', 'uuid' ]
    };

    async execute({ id }) {
        try {
            const { userId } = this.context;

            const module = await Module.findByPk(id, { include : {
                model : Word,
                as    : 'words'
            } });

            if (module.private && userId !== module.userId) {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : { id: 'MODULE_IS_PRIVATE' }
                });
            }

            return { data: dumpModule(module) };
        } catch (x) {
            if (x instanceof DMX.WrongId) {
                throw new X({
                    code   : 'WRONG_ID',
                    fields : { [x.field]: 'WRONG_ID' }
                });
            }

            throw x;
        }
    }
}

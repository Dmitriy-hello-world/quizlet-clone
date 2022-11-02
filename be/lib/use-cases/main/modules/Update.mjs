import {
    Exception as X
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpModule } from '../../utils/dumps.mjs';
import Module         from '../../../domain-model/Module.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class ModulesUpdate extends Base {
    static validationRules = {
        id              : [ 'required', 'uuid' ],
        name            : [ 'string', { 'max_length': 255 } ],
        description     : [ 'string' ],
        private         : [ 'boolean' ],
        editByOutsiders : [ 'boolean' ]
    };

    async execute({ id, ...data }) {
        try {
            const { userId } = this.context;

            const module = await Module.findByPk(id);

            if (module.private && userId !== module.userId) {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : { id: 'MODULE_IS_PRIVATE' }
                });
            }

            if (!module.editedByOutsiders && userId !== module.userId) {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : { id: 'MODULE_CLOSED_FOR_UPDATE' }
                });
            }

            const result = await module.update(data);

            return { data: dumpModule(result) };
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

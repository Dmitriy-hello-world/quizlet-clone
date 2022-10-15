import {
    Exception as X
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpModule } from '../../utils/dumps.mjs';
import User         from '../../../domain-model/User.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class ModulesCreate extends Base {
    static validationRules = {
        name              : [ 'required', 'string', { 'max_length': 255 } ],
        description       : [ 'string' ],
        private           : [ 'boolean', { 'default': true }  ],
        editedByOutsiders : [ 'boolean', { 'default': false }  ]
    };

    async execute(data) {
        try {
            const { userId } = this.context;

            const user = await User.findByPk(userId);

            const module = await user.createModule(data);

            return { data: dumpModule(module) };
        } catch (x) {
            if (x instanceof DMX.NotUnique) {
                throw new X({
                    code   : 'NOT_UNIQUE',
                    fields : { [x.field]: 'NOT_UNIQUE' }
                });
            }

            throw x;
        }
    }
}

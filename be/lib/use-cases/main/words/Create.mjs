import {
    Exception as X
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpWord } from '../../utils/dumps.mjs';
import Module       from '../../../domain-model/Module.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class WordsCreate extends Base {
    static validationRules = {
        moduleId   : [ 'required', 'uuid' ],
        term       : [ 'required', 'string' ],
        definition : [ 'required', 'string' ],
        imageUrl   : [ 'string'  ]
    };

    async execute({ moduleId, ...data }) {
        try {
            const { userId } = this.context;

            const module = await Module.findByPk(moduleId);

            if (module.userId !== userId) {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : { token: 'WRONG_MODULE_ID' }
                });
            }

            const word = await module.createWord(data);

            return { data: dumpWord(word) };
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

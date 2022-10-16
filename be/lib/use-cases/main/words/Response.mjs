import moment       from 'moment/moment.js';
import {
    Exception as X
} from '../../../../packages.mjs';

import config from '../../../config.cjs';

import Base         from '../../Base.mjs';
import { dumpWord } from '../../utils/dumps.mjs';
import Word         from '../../../domain-model/Word.mjs';
import DMX          from '../../../domain-model/X.mjs';

const STAGES_PER_ERROR = 3;
const MAX_STAGE = 8;

export default class WordsResponse extends Base {
    static validationRules = {
        id       : [ 'required', 'uuid' ],
        response : [ 'required', 'boolean' ]
    };

    async execute({ id, response }) {
        try {
            const { userId } = this.context;

            const word = await Word.findByPk(id);

            const module = await word.getModule();

            if (module.userId !== userId && !module.editedByOutsiders) {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : { token: 'WRONG_WORD_ID' }
                });
            }

            let result = void 0;

            if (response) {
                const [ key, value ] = config.stages[word?.stage];

                result = await word.update({
                    stage    : word.stage + 1 > MAX_STAGE ? MAX_STAGE : word.stage + 1,
                    repeatAt : moment().add(+key, value)
                });
            } else {
                const stage = word.stage - STAGES_PER_ERROR >= 1 ? word.stage - STAGES_PER_ERROR : 1;

                result = await word.update({
                    stage
                });
            }


            return { data: dumpWord(result) };
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

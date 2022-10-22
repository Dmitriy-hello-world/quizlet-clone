import moment       from 'moment/moment.js';
import {
    Exception as X
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpWord } from '../../utils/dumps.mjs';
import Word         from '../../../domain-model/Word.mjs';
import DMX          from '../../../domain-model/X.mjs';

const STEPS_PER_ERROR = 3;
const STEP = 2;

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
                const progress = moment(word?.updateAt).diff(moment(word?.repeatAt), 'hours') || 1;

                result = await word.update({
                    repeatAt : moment().add(progress * STEP, 'hours')
                });
            } else {
                const progress = moment(word?.updateAt).diff(moment(word?.repeatAt), 'hours') || 1;

                result = await word.update({
                    repeatAt : moment().add(Math.round(progress / STEPS_PER_ERROR), 'hours')
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

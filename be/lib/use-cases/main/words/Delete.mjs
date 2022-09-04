import {
    Exception as X
} from '../../../../packages.mjs';

import Base   from '../../Base.mjs';
import Word   from '../../../domain-model/Word.mjs';
import DMX    from '../../../domain-model/X.mjs';

export default class WordsDelete extends Base {
    static validationRules = {
        id : [ 'required', 'uuid' ]
    };

    async execute({ id }) {
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

            await word.destroy();

            return { };
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

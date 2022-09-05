import {
    Exception as X
} from '../../../../packages.mjs';

import Base   from '../../Base.mjs';
import Module   from '../../../domain-model/Module.mjs';
import DMX    from '../../../domain-model/X.mjs';

export default class ModulesDelete extends Base {
    static validationRules = {
        id : [ 'required', 'uuid' ]
    };

    async execute({ id }) {
        try {
            const { userId } = this.context;

            const module = await Module.findByPk(id, { where: { userId } });

            await module.destroy();

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

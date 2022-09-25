import {
    Exception as X
} from '../../../../packages.mjs';
import Base         from '../../Base.mjs';
import { dumpUser } from '../../utils/dumps.mjs';
import Module       from '../../../domain-model/Module.mjs';
import User         from '../../../domain-model/User.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class UsersProfile extends Base {
    async execute() {
        try {
            const { userId } = this.context;

            const user = await User.findByPk(userId, { include : {
                model : Module,
                as    : 'modules'
            } });

            return { data: dumpUser(user) };
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

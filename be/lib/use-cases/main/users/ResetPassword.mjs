import {
    Exception as X
} from '../../../../packages.mjs';
import Base        from '../../Base.mjs';
import User        from '../../../domain-model/User.mjs';
import DMX         from '../../../domain-model/X.mjs';

export default class UsersResetPassword extends Base {
    static validationRules = {
        data : { 'nested_object' : {
            email : [ 'required', 'email' ]
        } }
    };

    async execute({ data }) {
        try {
            const user = await User.findOne({ where: { email: data.email } });

            if (!user) {
                throw new X({
                    code   : 'USER_NOT_FOUND',
                    fields : { email: 'USER_NOT_FOUND' }
                });
            }

            return {};
        } catch (x) {
            if (x instanceof DMX.InactiveObject) {
                throw new X({
                    code   : 'USER_IS_BLOCKED',
                    fields : { email: 'USER_IS_BLOCKED' }
                });
            }

            throw x;
        }
    }
}

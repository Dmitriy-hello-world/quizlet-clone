import {
    Exception as X
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpUser } from '../../utils/dumps.mjs';
import User         from '../../../domain-model/User.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class UsersCreate extends Base {
    static validationRules = {
        email           : [ 'required', 'email', { 'max_length': 255 }, 'to_lc' ],
        password        : [ 'required', 'string' ],
        confirmPassword : [ 'required', { 'equal_to_field': [ 'password' ] } ],
        firstName       : [ 'string', { 'min_length': 2 }, { 'max_length': 50 } ],
        secondName      : [ 'string', { 'min_length': 2 }, { 'max_length': 50 } ],
        avatar          : [ 'string', { 'min_length': 2 }, { 'max_length': 150 } ]
    };

    async execute(data) {
        try {
            const user = await User.create(data);

            return { data: dumpUser(user) };
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

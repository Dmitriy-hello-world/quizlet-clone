import {
    Exception as X
    , Op
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpModule } from '../../utils/dumps.mjs';
import Module       from '../../../domain-model/Module.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class ModulesList extends Base {
    static validationRules = {
        search   : [ { 'min_length': 2 } ],
        limit    : [ 'positive_integer', { 'max_number': 20 }, { 'default': 20 } ],
        offset   : [ 'integer', { 'min_number': 0 }, { 'default': 0 } ],
        sortedBy : [ { 'one_of': [ 'id', 'name', 'private', 'editedByOutsiders', 'createdAt', 'updatedAt' ] }, { 'default': 'createdAt' } ],
        order    : [ { 'one_of': [ 'ASC', 'DESC' ] }, { 'default': 'DESC' } ]
    };

    async execute({
        limit,
        offset,
        search,
        sortedBy,
        order
    }) {
        try {
            const { userId } = this.context;
            const searchFields = [ 'name', 'description' ];
            const findQuery = search
                ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
                : {};

            const dbRequest = {
                where : { ...findQuery, userId },
                order : [ [ sortedBy, order ] ],
                limit,
                offset
            };

            const [ { count: filteredCount, rows: users }, totalCount ] = await Promise.all([
                Module.findAndCountAll(dbRequest),
                Module.count()
            ]);

            const data = users.map(dumpModule);

            return {
                data,
                meta : {
                    totalCount,
                    filteredCount,
                    limit,
                    offset
                }
            };
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

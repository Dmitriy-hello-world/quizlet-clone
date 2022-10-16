import moment from 'moment';
import {
    Exception as X
    , Op
} from '../../../../packages.mjs';

import Base         from '../../Base.mjs';
import { dumpWord } from '../../utils/dumps.mjs';
import Word         from '../../../domain-model/Word.mjs';
import Module       from '../../../domain-model/Module.mjs';
import DMX          from '../../../domain-model/X.mjs';

export default class WordsList extends Base {
    static validationRules = {
        moduleId  : [ 'required', 'uuid' ],
        search    : [ { 'min_length': 2 } ],
        limit     : [ 'positive_integer', { 'max_number': 20 }, { 'default': 20 } ],
        offset    : [ 'integer', { 'min_number': 0 }, { 'default': 0 } ],
        forgotten : [ 'boolean', { 'default': false } ],
        sortedBy  : [ { 'one_of': [ 'term', 'definition', 'createdAt', 'updatedAt' ] }, { 'default': 'createdAt' } ],
        order     : [ { 'one_of': [ 'ASC', 'DESC' ] }, { 'default': 'DESC' } ]
    };

    async execute({
        moduleId,
        limit,
        offset,
        search,
        forgotten,
        sortedBy,
        order
    }) {
        try {
            const { userId } = this.context;
            const module = Module.findByPk(moduleId);

            if (module.private && userId !== module.userId) {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : { id: 'MODULE_IS_PRIVATE' }
                });
            }

            const searchFields = [ 'term', 'definition' ];
            const findQuery = search
                ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
                : {};

            const dbRequest = {
                where : {
                    ...findQuery,
                    moduleId,
                    ...(forgotten ? { repeatAt: { [Op.lte]: moment() } } : {})
                },
                order : [ [ sortedBy, order ] ],
                limit,
                offset
            };

            const [ { count: filteredCount, rows: users }, totalCount ] = await Promise.all([
                Word.findAndCountAll(dbRequest),
                Word.count({ where: { moduleId } })
            ]);

            const data = users.map(dumpWord);

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

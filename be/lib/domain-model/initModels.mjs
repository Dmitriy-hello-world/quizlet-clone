import cls       from 'cls-hooked';
import Sequelize from 'sequelize';

import User                    from './User.mjs';
import Module                  from './Module.mjs';
import Word                    from './Word.mjs';

Sequelize.useCLS(cls.createNamespace('sequelize-transactions-namespace'));

export default function initAllModels(dbConfig) {
    const { database, username, password, dialect, host, port } = dbConfig;

    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        logging        : false,
        dialectOptions : {
            connectTimeout : 10000
        },
        pool : {
            min     : 0,
            max     : 10,
            idle    : 10000, // The maximum time, in milliseconds, that a connection can be idle before being released.
            acquire : 30000 // ..., that pool will try to get connection before throwing error
        },
        retry : { // Set of flags that control when a query is automatically retried.
            match : [
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /SequelizeHostNotFoundError/,
                /SequelizeHostNotReachableError/,
                /SequelizeInvalidConnectionError/,
                /SequelizeConnectionTimedOutError/,
                /TimeoutError/,
                /SequelizeDatabaseError/
            ],
            max : 4 // How many times a failing query is automatically retried.
        }
    });

    const models = {
        User,
        Module,
        Word
    };

    Object.values(models).forEach(model => model.init(sequelize));
    Object.values(models).forEach(model => model.initRelationsAndHooks(sequelize));

    return {
        ...models,
        sequelize
    };
}

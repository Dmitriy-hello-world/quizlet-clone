import controllers from './controllers/index.mjs';

export default async (router) => {
    const checkSession = controllers.sessions.check;

    // Users
    router.register(async (secureRouter) => {
        secureRouter.addHook('preHandler', checkSession);

        secureRouter.get('/:id',     controllers.users.show);
        secureRouter.get('/profile', controllers.users.profile);
        secureRouter.get('/',        controllers.users.list);
        secureRouter.put('/:id',     controllers.users.update);
        secureRouter.delete('/:id',  controllers.users.delete);
    }, { prefix: '/users' });

    // Words
    router.register(async (secureRouter) => {
        secureRouter.addHook('preHandler', checkSession);

        secureRouter.post('/',      controllers.words.create);
        secureRouter.get('/',       controllers.words.list);
        secureRouter.put('/:id',    controllers.words.update);
        secureRouter.delete('/:id', controllers.words.delete);
    }, { prefix: '/words' });

    // Modules
    router.register(async (secureRouter) => {
        secureRouter.addHook('preHandler', checkSession);

        secureRouter.get('/:id',    controllers.modules.show);
        secureRouter.get('/',       controllers.modules.list);
        secureRouter.post('/',      controllers.modules.create);
        secureRouter.put('/:id',    controllers.modules.update);
        secureRouter.delete('/:id', controllers.modules.delete);
    }, { prefix: '/modules' });

    // Sessions
    router.post('/sessions', controllers.sessions.create);

    // Users
    router.post('/users',               controllers.users.create);
    router.post('/users/resetPassword', controllers.users.resetPassword);

    // Files
    router.register(async (secureRouter) => {
        secureRouter.addHook('preHandler', checkSession);

        secureRouter.post('/:type', controllers.files.create);
    }, { prefix: '/files' });

    // '{{GENERATE_NEW_DATA_BELOW}}'
};

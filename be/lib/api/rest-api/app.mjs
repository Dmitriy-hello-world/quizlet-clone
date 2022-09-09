/* eslint import/imports-first:0  import/newline-after-import:0 */
import path          from 'node:path';
import { fileURLToPath } from 'url';
import Fastify       from 'fastify';

import logger        from '../logger.mjs';
import middlewares   from './middlewares.mjs';
import mainRouter    from './main/router.mjs';

// Init app
const app = Fastify();
const __filename = fileURLToPath(import.meta.url);

export async function start(appPort) {
    await app.register(import('@fastify/middie'));
    app.register(import('@fastify/formbody'));
    app.register(import('@fastify/multipart'));

    // middlewares init
    app.use(middlewares.cors);
    app.use(middlewares.include);

    app.register(import('@fastify/static'), {
        root   : path.join(path.dirname(__filename), 'apidoc'),
        prefix : '/swagger'
    });

    // routes init
    app.register(mainRouter, { prefix: '/api/v1' });

    await app.listen({ port: appPort, host: '0.0.0.0' });

    const { port = '8000', address = '0.0.0.0' } = app.addresses().find(({ family }) => family === 'IPv4');

    global.REST_API_PORT = port; // For tests. TODO: export app and use it tests
    logger.info(`[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
}

export async function stop() {
    if (!app) return;
    logger.info('[RestApiApp] Closing server');
    await app.close();
}

export default app;

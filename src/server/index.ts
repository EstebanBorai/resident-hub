import fastify, { FastifyInstance } from 'fastify';
import cookiePlugin from 'fastify-cookie';
import jwtPlugin from 'fastify-jwt';

import bootstrap from './utils/bootstrap';
import nextPlugin from './plugins/next';
import mongoosePlugin from './plugins/mongoose';
import servicesPlugin from './plugins/services';
import routes from './routes';
import { FastifyCookieOptions } from 'fastify-cookie';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(cookiePlugin, {
    secret: process.env.COOKIE_SIGNATURE,
    parseOptions: {},
  } as FastifyCookieOptions);
  await server.register(jwtPlugin, {
    secret: process.env.JWT_PRIVATE_KEY,
    cookie: {
      cookieName: process.env.JWT_TOKEN_COOKIE_NAME,
    },
  });
  await server.register(routes);
  await server.register(nextPlugin);
  await server.register(mongoosePlugin, {
    url: new URL(process.env.MONGO_URL),
  });
  await server.register(servicesPlugin);

  // This should always run before returning the `server` instance
  // which means that all reources required on runtime are up and running
  await bootstrap(server.services);

  return server;
};

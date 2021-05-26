import fastify, { FastifyInstance } from 'fastify';
import corsPlugin from 'fastify-cors';
import cookiePlugin from 'fastify-cookie';
import jwtPlugin from 'fastify-jwt';

import bootstrap from './utils/bootstrap';
import nextPlugin from './plugins/next';
import typeormPlugin from './plugins/typeorm';
import servicesPlugin from './plugins/services';
import routes from './routes';
import { FastifyCookieOptions } from 'fastify-cookie';

export default async (): Promise<FastifyInstance> => {
  const {
    APPLICATION_DOMAIN,
    COOKIE_SIGNATURE,
    JWT_PRIVATE_KEY,
    JWT_TOKEN_COOKIE_NAME,
    PORT,
  } = process.env;
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(corsPlugin, {
    credentials: true,
    // currently we have no support for HTTPS on development, but URL schema
    // we shall use "HTTPS" for every environment ASAP
    origin: `http://${APPLICATION_DOMAIN}${
      typeof PORT === 'undefined' ? '' : ':' + PORT
    }`,
    exposedHeaders: ['set-cookie'],
    methods: ['get', 'post', 'put', 'patch', 'delete'],
    allowedHeaders: ['origin, content-type, accept'],
  });
  await server.register(cookiePlugin, {
    secret: COOKIE_SIGNATURE,
    parseOptions: {},
  } as FastifyCookieOptions);
  await server.register(jwtPlugin, {
    secret: JWT_PRIVATE_KEY,
    cookie: {
      cookieName: JWT_TOKEN_COOKIE_NAME,
    },
  });
  await server.register(routes);
  await server.register(nextPlugin);
  await server.register(typeormPlugin);
  await server.register(servicesPlugin);

  // This should always run before returning the `server` instance
  // which means that all reources required on runtime are up and running
  await bootstrap(server.services);

  return server;
};

import fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';

import nextPlugin from './plugins/next';
import mongoosePlugin from './plugins/mongoose';
import servicesPlugin from './plugins/services';
import routes from './routes';

export default async (): Promise<FastifyInstance> => {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config();
  }

  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(routes);
  await server.register(nextPlugin);
  await server.register(mongoosePlugin, {
    url: new URL(process.env.MONGO_URL),
  });
  await server.register(servicesPlugin);

  return server;
};

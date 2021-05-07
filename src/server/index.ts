import fastify, { FastifyInstance } from 'fastify';

import nextPlugin from './plugins/next';
import mongoosePlugin from './plugins/mongoose';
import servicesPlugin from './plugins/services';
import routes from './routes';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  if (process.env.NODE_ENV === 'development') {
    const mod = await import('dotenv');
    const result = mod.config();

    if (result.error) {
      throw new Error('Failed to read ".env" file');
    }

    server.log.warn('Loading environment variables from .env file');
  }

  await server.register(routes);
  await server.register(nextPlugin);
  await server.register(mongoosePlugin, {
    url: new URL(process.env.MONGO_URL),
  });
  await server.register(servicesPlugin);

  return server;
};

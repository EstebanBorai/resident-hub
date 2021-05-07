import fp from 'fastify-plugin';
import mongoose from 'mongoose';

import type { FastifyInstance } from 'fastify';

export type MongooseConfig = {
  url: URL;
};

export default fp(
  async (
    fastify: FastifyInstance,
    options: MongooseConfig,
    next: (err?: Error) => void,
  ): Promise<void> => {
    const mongodbConnection = mongoose.connect(options.url.toString(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    fastify.decorate('mongoose', mongodbConnection);

    next();
  },
  {
    name: 'mongoose',
  },
);

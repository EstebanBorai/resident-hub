import type { Mongoose } from 'mongoose';

declare module 'fastify' {
  export interface FastifyInstance {
    mongoose: Mongoose;
  }
}

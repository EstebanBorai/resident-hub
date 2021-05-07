import type { Mongoose } from 'mongoose';
import type { Services } from '../plugins/services';

declare module 'fastify' {
  export interface FastifyInstance {
    mongoose: Mongoose;
    services: Services;
  }
}

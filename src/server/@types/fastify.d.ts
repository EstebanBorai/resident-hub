import type { preValidationHookHandler } from 'fastify';
import type { FastifyJWT } from 'fastify-jwt';
import type { Mongoose } from 'mongoose';
import type { Services } from '../plugins/services';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: FastifyJWT & preValidationHookHandler;
    mongoose: Mongoose;
    services: Services;
    user: {
      email: string;
      iat: number;
      exp: number;
    };
  }
}

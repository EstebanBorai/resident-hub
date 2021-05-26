import type { preValidationHookHandler } from 'fastify';
import type { FastifyJWT } from 'fastify-jwt';
import type { Connection } from 'typeorm';
import type { Services } from '../plugins/services';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: FastifyJWT & preValidationHookHandler;
    typeorm: Connection;
    services: Services;
    user: {
      email: string;
      iat: number;
      exp: number;
    };
  }
}

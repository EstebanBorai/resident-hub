import users from './users';

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.register(users, {
    prefix: 'users',
  });

  done();
}

import me from './me';
import users from './users';
import parkingLot from './parking-lot';
import parkingSlot from './parking-slot';

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
  fastify.addHook('onRequest', async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.register(me, {
    prefix: 'me',
  });

  fastify.register(users, {
    prefix: 'users',
  });

  fastify.register(parkingLot, {
    prefix: 'parking/lots',
  });

  fastify.register(parkingSlot, {
    prefix: 'parking/slots',
  });

  done();
}

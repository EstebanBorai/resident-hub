import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { Role } from '../../../models/user';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.post(
    '/',
    async (
      request: FastifyRequest<{
        Body: {
          email: string;
          password: string;
          role: Role;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const currentUser = await fastify.services.user.findByEmail(
          request.user.email,
        );

        const user = await fastify.services.user.create(
          currentUser,
          request.body,
        );

        reply.status(201);

        return user;
        return '';
      } catch (error) {
        return reply.status(500).send({
          message: error.toString(),
        });
      }
    },
  );

  done();
}

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
        const user = await fastify.services.user.create(
          request.body,
          request.user.email,
        );

        reply.status(201);

        return user;
      } catch (error) {
        return reply.status(500).send({
          message: error.toString(),
        });
      }
    },
  );

  done();
}

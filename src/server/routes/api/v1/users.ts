import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { Role } from '../../../models/user';
import httpResponse from '../../../utils/http-response';

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
      } catch (error) {
        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  done();
}

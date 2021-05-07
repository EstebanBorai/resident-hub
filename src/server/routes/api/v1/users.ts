import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

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
          firstName: string;
          lastName: string;
          email: string;
          password: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const user = await fastify.services.user.create(request.body);

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

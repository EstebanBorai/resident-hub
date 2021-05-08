import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import httpResponse from '../../../utils/http-response';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.user as Thruway.JwtToken;
      const user = await fastify.services.user.findByEmail(token.email);

      return httpResponse.ok(reply, user.toJSON());
    } catch (error) {
      return httpResponse.internalServerError(reply, error);
    }
  });

  done();
}

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import httpResponse from '../../../utils/http-response';
import { UserByEmailNotFound } from '../../../error/user.service';

import type { Thruway } from '../../../../@types/thruway';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.user as Thruway.JwtToken;
      const user = await fastify.services.user.findByEmail(token.email);

      return httpResponse.ok(reply, user.toPresentationLayer());
    } catch (error) {
      if (error instanceof UserByEmailNotFound) {
        return httpResponse.badRequestMessage(reply, error.message);
      }

      return httpResponse.internalServerError(reply, error);
    }
  });

  done();
}

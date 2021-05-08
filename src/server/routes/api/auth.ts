import basicAuth, { BasicAuthError } from '../../utils/basic-auth';
import { InvalidCreadentials, UserNotFound } from '../../error/user.service';
import httpResponse from '../../utils/http-response';

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';
import type { RegisterDTO } from '../../service/auth';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.route({
    url: '/login',
    method: 'POST',
    handler: async (request, reply): Promise<void> => {
      try {
        if (request.headers.authorization) {
          const authorization = request.headers.authorization;
          const credentials = basicAuth(authorization);

          const token = await fastify.services.auth.authenticate(credentials);

          reply.setCookie('thruway::token', token, {
            domain: process.env.APPLICATION_DOMAIN,
            // Use HTTPS only in production
            secure: process.env.NODE_ENV === 'production' && true,
            httpOnly: true,
            sameSite: true,
          });

          return httpResponse.okMessage(reply, 'Authenticated');
        }

        return httpResponse.badRequestMessage(
          reply,
          'Missing authentication header',
        );
      } catch (error) {
        fastify.log.error(error);

        if (error instanceof BasicAuthError) {
          return httpResponse.badRequestMessage(
            reply,
            'Missing HTTP Header: "Authorization"',
            error,
          );
        }

        if (
          error instanceof UserNotFound ||
          error instanceof InvalidCreadentials
        ) {
          return httpResponse.forbiddenMessage(
            reply,
            'Invalid credentials',
            error,
          );
        }

        return httpResponse.internalServerError(reply, error);
      }
    },
  });

  fastify.route({
    url: '/signup',
    method: 'POST',
    handler: async (request, reply): Promise<void> => {
      try {
        await fastify.services.auth.register(request.body as RegisterDTO);

        return httpResponse.createdMessage(reply, 'Created');
      } catch (error) {
        return httpResponse.internalServerError(reply, error);
      }
    },
  });

  done();
}

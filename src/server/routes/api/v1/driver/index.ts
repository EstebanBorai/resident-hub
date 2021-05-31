import httpResponse from '../../../../utils/http-response';
import validationSchema from './validation-schema';

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
    { schema: validationSchema.createDriverSchema },
    async (
      request: FastifyRequest<{
        Body: {
          firstName: string;
          lastName: string;
          isResident: boolean;
          NID: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        console.log({ ...request.body });

        return [];
      } catch (error) {
        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  done();
}

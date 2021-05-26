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
    '/:userId',
    { schema: validationSchema.createDriverSchema },
    async (
      request: FastifyRequest<{
        Params: {
          userId: string;
        };
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
        const createdDriver = await fastify.services.driver.create({
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          NID: request.body.NID,
          isResident: request.body.isResident,
          userId: request.params.userId,
        });

        return createdDriver.toPresentationLayer();
      } catch (error) {
        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  done();
}

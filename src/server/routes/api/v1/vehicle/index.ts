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
    { schema: validationSchema.createVehicleSchema },
    async (
      request: FastifyRequest<{
        Params: {
          driverId: string;
        };
        Body: {
          license: string;
          color: string;
          model: string;
          brand: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const createdVehicle = await fastify.services.vehicle.create({
          color: request.body.color,
          driverId: request.params.driverId,
          license: request.body.license,
          brand: request.body.brand,
          model: request.body.model,
        });

        return createdVehicle.toPresentationLayer();
      } catch (error) {
        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  done();
}

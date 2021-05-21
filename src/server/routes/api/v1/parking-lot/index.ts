import httpResponse from '../../../../utils/http-response';
import { UnexistentParkingLotID } from '../../../../error/parking-lot.service';
import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import validationSchema from './validation-schema';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.post(
    '/',
    { schema: validationSchema.createParkingLotSchema },
    async (
      request: FastifyRequest<{
        Body: {
          name: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const parkingLot = await fastify.services.parkingLot.create(
          request.body,
        );

        return httpResponse.created(reply, parkingLot.toPresentationLayer());
      } catch (error) {
        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  fastify.put(
    '/:id',
    { schema: validationSchema.updateParkingLotSchema },
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
        Body: {
          name: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const parkingLot = await fastify.services.parkingLot.update({
          id: request.params.id,
          ...request.body,
        });

        return httpResponse.ok(reply, parkingLot.toPresentationLayer());
      } catch (error) {
        if (error instanceof UnexistentParkingLotID) {
          return httpResponse.badRequestMessage(
            reply,
            `Parking Lot with id: "${request.params.id}" does not exists`,
            error,
          );
        }

        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  fastify.delete(
    '/:id',
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const removed = await fastify.services.parkingLot.remove(
          request.params.id,
        );

        return httpResponse.ok(reply, removed.toPresentationLayer());
      } catch (error) {
        if (error instanceof UnexistentParkingLotID) {
          return httpResponse.badRequestMessage(
            reply,
            `Parking Lot with id: "${request.params.id}" does not exists`,
            error,
          );
        }

        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  done();
}

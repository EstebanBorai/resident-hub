import httpResponse from '../../../../utils/http-response';
import validationSchema from './validation-schema';
import { UnexistentParkingLotID } from '../../../../error/parking-lot.service';
import { UnexistentParkingSlotID } from '../../../../error/parking-slot.service';

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import type { ParkingSlot } from '../../../../models/parking-slot';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.post(
    '/:id/slot',
    { schema: validationSchema.createParkingSlotSchema },
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
        const parkingSlot = await fastify.services.parkingSlot.create(
          request.params.id,
          request.body as ParkingSlot,
        );

        return httpResponse.created(reply, parkingSlot.toPresentationLayer());
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

  fastify.put(
    '/:id/slot/:slot_id',
    { schema: validationSchema.updateParkingSlotSchema },
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
          slot_id: string;
        };
        Body: {
          name: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const parkingSlot = await fastify.services.parkingSlot.update({
          id: request.params.slot_id,
          parkingLotId: request.params.id,
          ...request.body,
        });

        return httpResponse.ok(reply, parkingSlot.toPresentationLayer());
      } catch (error) {
        if (error instanceof UnexistentParkingLotID) {
          return httpResponse.badRequestMessage(
            reply,
            `Parking Lot with id: "${request.params.id}" does not exists`,
            error,
          );
        }

        if (error instanceof UnexistentParkingSlotID) {
          return httpResponse.badRequestMessage(
            reply,
            `Parking Slot with id: "${request.params.slot_id}" does not exists`,
            error,
          );
        }

        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  fastify.delete(
    '/:id/slot/:slot_id',
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
          slot_id: string;
        };
      }>,
      reply: FastifyReply,
    ) => {
      try {
        const removed = await fastify.services.parkingSlot.remove(
          request.params.slot_id,
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

        if (error instanceof UnexistentParkingSlotID) {
          return httpResponse.badRequestMessage(
            reply,
            `Parking Slot with id: "${request.params.slot_id}" does not exists`,
            error,
          );
        }

        return httpResponse.internalServerError(reply, error);
      }
    },
  );

  done();
}

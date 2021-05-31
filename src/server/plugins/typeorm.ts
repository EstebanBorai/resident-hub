import fp from 'fastify-plugin';
import { createConnection } from 'typeorm';

import User from '../models/user';
import ParkingLot from '../models/parking-lot';
import ParkingSlot from '../models/parking-slot';
import Vehicle from '../models/vehicle';

import type { FastifyInstance } from 'fastify';

export default fp(
  async (
    fastify: FastifyInstance,
    _: undefined,
    next: (err?: Error) => void,
  ): Promise<void> => {
    try {
      const {
        PGHOST = '127.0.0.1',
        PGPORT = 5432,
        POSTGRES_DB = 'thruway',
        POSTGRES_USER = 'thruway',
        POSTGRES_PASSWORD = 'thruway',
      } = process.env;

      const connection = await createConnection({
        type: 'postgres',
        host: PGHOST,
        port: +PGPORT,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: [User, ParkingLot, ParkingSlot, Vehicle],
      });

      fastify.decorate('typeorm', connection);

      next();
    } catch (error) {
      next(error);
    }
  },
  {
    name: 'typeorm',
  },
);

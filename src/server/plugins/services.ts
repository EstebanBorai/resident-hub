import fp from 'fastify-plugin';

import AuthService from '../service/auth';
import LoggerService from '../service/logger';
import UserService from '../service/user';
import ParkingLotService from '../service/parking-lot';
import ParkingSlotService from '../service/parking-slot';
import DriverService from '../service/driver';
import VehicleService from '../service/vehicle';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import type { IAuthService } from '../service/auth';
import type { ILoggerService } from '../service/logger';
import type { IUserService } from '../service/user';
import type { IParkingLotService } from '../service/parking-lot';
import type { IParkingSlotService } from '../service/parking-slot';
import type { IDriverService } from '../service/driver';
import type { IVehicleService } from '../service/vehicle';

export type Services = {
  auth: IAuthService;
  logger: ILoggerService;
  user: IUserService;
  parkingLot: IParkingLotService;
  parkingSlot: IParkingSlotService;
  driver: IDriverService;
  vehicle: IVehicleService;
};

export default fp(
  async (
    fastify: FastifyInstance,
    _: RegisterOptions,
    next: (err?: Error) => void,
  ): Promise<void> => {
    const logger = new LoggerService(fastify.log);
    const user = new UserService(logger);
    const auth = new AuthService(logger, user);
    const parkingLot = new ParkingLotService();
    const parkingSlot = new ParkingSlotService(parkingLot);
    const driver = new DriverService(user);
    const vehicle = new VehicleService(driver);

    fastify.decorate('services', {
      auth,
      logger,
      user,
      parkingLot,
      parkingSlot,
      driver,
      vehicle,
    });

    next();
  },
  {
    name: 'services',
    dependencies: ['typeorm'],
  },
);

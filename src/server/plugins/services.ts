import fp from 'fastify-plugin';

import UserService from '../service/user';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import type { IUserService } from '../service/user';

export type Services = {
  user: IUserService;
};

export default fp(
  async (
    fastify: FastifyInstance,
    _: RegisterOptions,
    next: (err?: Error) => void,
  ): Promise<void> => {
    fastify.decorate('services', {
      user: UserService,
    });

    next();
  },
  {
    name: 'services',
    dependencies: ['mongoose'],
  },
);

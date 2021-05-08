import fp from 'fastify-plugin';

import AuthService from '../service/auth';
import UserService from '../service/user';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import type { IAuthService } from '../service/auth';
import type { IUserService } from '../service/user';

export type Services = {
  auth: IAuthService;
  user: IUserService;
};

export default fp(
  async (
    fastify: FastifyInstance,
    _: RegisterOptions,
    next: (err?: Error) => void,
  ): Promise<void> => {
    const user = new UserService();
    const auth = new AuthService(user);

    fastify.decorate('services', {
      auth,
      user,
    });

    next();
  },
  {
    name: 'services',
    dependencies: ['mongoose'],
  },
);

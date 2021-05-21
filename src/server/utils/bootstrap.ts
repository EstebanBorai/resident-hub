import { UserByEmailNotFound } from '../error/user.service';
import { Role } from '../models/user';
import type { Services } from '../plugins/services';

async function createAdmin(services: Services): Promise<void> {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  const password = ADMIN_PASSWORD ? ADMIN_PASSWORD : 'root';

  async function createAdminUser(): Promise<void> {
    await services.user.create({
      email: ADMIN_EMAIL,
      password,
      role: Role.Admin,
    });

    services.logger.info('"admin" user created with success');

    return;
  }

  try {
    const isAdminCreated = await services.user.findByEmail(ADMIN_EMAIL);

    if (isAdminCreated === null) {
      await createAdminUser();

      return;
    }

    services.logger.info('No "admin" user was created');

    return;
  } catch (error) {
    if (error instanceof UserByEmailNotFound) {
      // the admin specified in the environment doesn't exists
      // creates a new one
      await createAdminUser();

      return;
    }
  }
}

/**
 *
 * @param services
 *
 * Application Bootsrap Proceedure
 *
 * This proceedure will run on every application execution one time.
 */
export default async function bootstrap(services: Services): Promise<void> {
  try {
    await createAdmin(services);
  } catch (error) {
    services.logger.error('An error ocurred during the "bootstrap" process');
    services.logger.error(error);
  }
}

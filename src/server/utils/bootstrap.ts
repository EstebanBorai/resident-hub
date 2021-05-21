import { Role } from '../models/user';
import type { Services } from '../plugins/services';

async function createAdmin(services: Services): Promise<void> {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  const isAdminCreated = await services.user.findByEmail(ADMIN_EMAIL);

  if (isAdminCreated === null) {
    // The admin user is not yet created
    const password = ADMIN_PASSWORD ? ADMIN_PASSWORD : 'root';

    await services.user.create({
      email: ADMIN_EMAIL,
      password,
      role: Role.Admin,
    });

    services.logger.info('"admin" user created with success');

    return;
  }

  services.logger.info('No "admin" user were created');

  return;
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

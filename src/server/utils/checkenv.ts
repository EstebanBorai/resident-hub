export default function checkenv(): void {
  const REQUIRED_ENVIRONMENT_VARIABLES = [
    'APPLICATION_DOMAIN',
    'COOKIE_SIGNATURE',
    'JWT_COOKIE_NAME',
    'JWT_EXPIRATION',
    'JWT_PRIVATE_KEY',
    'NODE_ENV',
    'PORT',
    'MONGO_URL',
  ];

  for (const env of REQUIRED_ENVIRONMENT_VARIABLES) {
    if (typeof process.env[env] === 'undefined') {
      throw new Error(`Missing "${env}" environment variable`);
    }
  }
}

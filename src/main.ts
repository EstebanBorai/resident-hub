import makeServer from './server';
import checkenv from './server/utils/checkenv';

(async () => {
  if (process.env.NODE_ENV === 'development') {
    const mod = await import('dotenv');
    const result = mod.config();

    if (result.error) {
      throw new Error('Failed to read ".env" file');
    }

    console.warn('Loading environment variables from .env file');
  }

  checkenv();
  const server = await makeServer();

  if (typeof process.env.PORT === 'undefined') {
    throw new Error('Missing "PORT" environment variable');
  }

  server.listen(+process.env.PORT, '0.0.0.0');
})();

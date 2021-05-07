import makeServer from './server';

(async () => {
  const server = await makeServer();

  if (typeof process.env.PORT === 'undefined') {
    throw new Error('Missing "PORT" environment variable');
  }

  server.listen(+process.env.PORT);
})();

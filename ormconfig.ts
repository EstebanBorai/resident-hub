const {
  PGHOST = '127.0.0.1',
  PGPORT = 5432,
  POSTGRES_DB = 'thruway',
  POSTGRES_USER = 'thruway',
  POSTGRES_PASSWORD = 'thruway',
} = process.env;

export default {
  type: 'postgres',
  host: PGHOST,
  port: PGPORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['./src/server/models/*.ts'],
  migrations: ['./migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
    entitiesDir: 'src/server/models',
  },
};

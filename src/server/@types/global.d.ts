declare namespace NodeJS {
  export type Environment = 'production' | 'development' | 'testing';

  export interface ProcessEnv {
    NODE_ENV: Environment;
    PORT: string;
    MONGO_URL: string;
    MONGO_INITDB_ROOT_USERNAME: string;
    MONGO_INITDB_ROOT_PASSWORD: string;
  }
}

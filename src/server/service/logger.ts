import type { FastifyLoggerInstance } from 'fastify';

export interface ILoggerService {
  error(data: unknown): void;
  info(data: unknown): void;
}

export default class LoggerService implements ILoggerService {
  private logger: FastifyLoggerInstance;

  constructor(logger: FastifyLoggerInstance) {
    this.logger = logger;
  }

  error(data: unknown): void {
    this.logger.error(data);
  }

  info(data: unknown): void {
    this.logger.info(data);
  }
}

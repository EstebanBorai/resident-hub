import bcrypt from 'bcrypt';

import { USERS_TABLE_NAME, Role, UserRuntype, mapper } from '../models/user';
import {
  AdminUserAlreadyExists,
  InvalidUserDTO,
  UserByEmailNotFound,
} from '../error/user.service';

import type { Knex } from 'knex';
import type { User } from '../models/user';
import type { ILoggerService } from './logger';

export type CreateUserDTO = {
  email: string;
  password: string;
  role: string;
};

export interface IUserService {
  create(dto: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export default class UserService implements IUserService {
  private knex: Knex;
  private loggerService: ILoggerService;

  constructor(loggerService: ILoggerService, knexInstance: Knex) {
    this.loggerService = loggerService;
    this.knex = knexInstance;
  }

  private async createPassword(plain: string): Promise<string> {
    const hash = await bcrypt.hash(plain, 10);

    return hash;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    if (dto.role === Role.Admin) {
      // check if no `Admin` is already created
      // if it is, an error is thrown as only one
      // `Admin` user should exist
      const adminUser = await this.knex(USERS_TABLE_NAME).where({
        role: Role.Admin,
      });

      if (adminUser) {
        throw new AdminUserAlreadyExists();
      }
    }

    if (UserRuntype.validate(dto).success) {
      const passwordHash = await this.createPassword(dto.password);
      const createdUser = await this.knex(USERS_TABLE_NAME)
        .insert({
          email: dto.email,
          password: passwordHash,
          role: dto.role,
        })
        .returning('*');

      this.loggerService.info(`User with email: "${dto.email}" was created`);

      return mapper.fromDatabaseRow(createdUser[0]);
    }

    throw new InvalidUserDTO();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.knex(USERS_TABLE_NAME).where({
      email,
    });

    if (!user.length) {
      throw new UserByEmailNotFound(email);
    }

    return mapper.fromDatabaseRow(user[0]);
  }
}

import bcrypt from 'bcrypt';

import UserModel, { Role } from '../models/user';
import {
  AdminUserAlreadyExists,
  UserByEmailNotFound,
} from '../error/user.service';

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
  private loggerService: ILoggerService;

  constructor(loggerService: ILoggerService) {
    this.loggerService = loggerService;
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
      const adminUser = await UserModel.findOne({
        role: Role.Admin,
      });

      if (adminUser) {
        throw new AdminUserAlreadyExists();
      }
    }

    const user = new UserModel(dto);
    const hash = await this.createPassword(dto.password);

    user.password = hash;

    await user.save();

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new UserByEmailNotFound(email);
    }

    return user;
  }
}

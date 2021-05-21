import bcrypt from 'bcrypt';

import UserModel from '../models/user';

import type { User } from '../models/user';
import type { ILoggerService } from './logger';
import { UserByEmailNotFound } from '../error/user.service';

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

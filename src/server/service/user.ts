import bcrypt from 'bcrypt';

import UserModel, { Role } from '../models/user';

import type { User } from '../models/user';
import type { ILoggerService } from './logger';

export type CreateUserDTO = {
  email: string;
  password: string;
  role: Role;
};

export interface IUserService {
  create(dto: CreateUserDTO, email: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
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

  async create(dto: CreateUserDTO, email: string): Promise<User> {
    const existentUser = await this.findByEmail(email);
    if (!dto.role) {
      throw new Error('"role" is a required field!');
    }

    if (existentUser.role === 'admin') {
      if (dto.role !== 'manager') {
        throw new Error('Action not allowed admin role');
      }
    }

    if (existentUser.role === 'manager') {
      if (dto.role !== 'user') {
        throw new Error('Action not allowed for manager role');
      }
    }

    if (existentUser.role === 'user') {
      throw new Error('Action not allowed for user role');
    }

    const user = new UserModel(dto);
    const hash = await this.createPassword(dto.password);

    user.password = hash;

    await user.save();

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return null;
    }

    return user;
  }
}

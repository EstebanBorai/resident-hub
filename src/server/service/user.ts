import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';

import User, { Role } from '../models/user';
import {
  AdminUserAlreadyExists,
  UserByEmailNotFound,
} from '../error/user.service';

import type { ILoggerService } from './logger';

export type CreateUserDTO = {
  email: string;
  password: string;
  role: string;
};

export interface IUserService {
  create(dto: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  setRefreshToken(email: string, token: string): Promise<User>;
  clearRefreshToken(email: string): Promise<User>;
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
    const userRepository = getRepository(User);

    if (dto.role === Role.Admin) {
      // check if no `Admin` is already created
      // if it is, an error is thrown as only one
      // `Admin` user should exist
      const adminUser = await userRepository.findOne({
        role: Role.Admin,
      });

      if (adminUser) {
        throw new AdminUserAlreadyExists();
      }
    }

    const user = new User();

    user.email = dto.email;
    user.password = await this.createPassword(dto.password);
    user.role = dto.role as Role;

    const createdUser = await userRepository.save(user);

    return createdUser;
  }

  async findByEmail(email: string): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new UserByEmailNotFound(email);
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      id,
    });

    if (!user) {
      // TODO: Usage of specific error
      throw new Error('User with id does not exist');
    }

    return user;
  }

  async setRefreshToken(email: string, token: string): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new UserByEmailNotFound(email);
    }

    user.refreshToken = token;

    const updatedUser = await userRepository.save(user);

    return updatedUser;
  }

  async clearRefreshToken(email: string): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new UserByEmailNotFound(email);
    }

    user.refreshToken = null;

    const updatedUser = await userRepository.save(user);

    return updatedUser;
  }
}

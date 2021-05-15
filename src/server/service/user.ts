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

  private checkRoles(role: string): void {
    const ROLES = [
      Role.Admin as string,
      Role.Manager as string,
      Role.User as string,
    ];

    if (!ROLES.includes(role)) {
      throw new Error(`Role "${role}" does not exists`);
    }
  }

  async create(dto: CreateUserDTO): Promise<User> {
    this.checkRoles(dto.role);
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

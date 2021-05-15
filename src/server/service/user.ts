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

  private async checkPermission(email: string, role: Role) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error(`User with email "${email}" does not exists`);
    }

    if (user.role === Role.Admin) {
      if (role !== Role.Manager) {
        throw new Error(
          'Admin user does not have permission for creating this user type',
        );
      }
    }

    if (user.role === Role.Manager) {
      if (role !== Role.User) {
        throw new Error(
          'Manager user does not have permission for creating this user type',
        );
      }
    }

    if (user.role === Role.User) {
      throw new Error(
        'User does not have permission to create others user type',
      );
    }
  }

  async create(dto: CreateUserDTO, email: string): Promise<User> {
    this.checkRoles(dto.role);
    await this.checkPermission(email, dto.role);
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

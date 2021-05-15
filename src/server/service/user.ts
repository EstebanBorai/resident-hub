import bcrypt from 'bcrypt';

import UserModel from '../models/user';

import type { User } from '../models/user';
import type { ILoggerService } from './logger';

export type CreateUserDTO = {
  email: string;
  password: string;
  role: string;
};

export interface IUserService {
  create(dto: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export default class UserService implements IUserService {
  private loggerService: ILoggerService;

  constructor(loggerService: ILoggerService) {
    this.loggerService = loggerService;
    this.createAdmin();
  }

  private async createAdmin(): Promise<void> {
    const existentAdmin = await UserModel.findOne({ role: 'admin' });

    if (existentAdmin) {
      return this.loggerService.info('Admin user already exists');
    }

    try {
      await this.create({
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
      });
      this.loggerService.info('Admin user created successfully');
    } catch (error) {
      this.loggerService.error('Was an error while creating admin user');
    }
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

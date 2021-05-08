import jsonwebtoken from 'jsonwebtoken';

import { InvalidCreadentials, UserNotFound } from '../error/user.service';

import type { Credentials } from '../utils/basic-auth';
import type { User } from '../models/user';
import type { IUserService } from './user';

export type RegisterDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IAuthService {
  authenticate(credentials: Credentials): Promise<string>;
  register(dto: RegisterDTO): Promise<void>;
}

export default class AuthService implements IAuthService {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  private signToken(user: User): string {
    return jsonwebtoken.sign(
      {
        email: user.email,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
  }

  async authenticate({ username, password }: Credentials): Promise<string> {
    const user = await this.userService.findByEmail(username);

    if (user) {
      const isPasswordValid = user.validatePassword(password);

      if (isPasswordValid) {
        return this.signToken(user);
      }

      throw new InvalidCreadentials();
    }

    throw new UserNotFound('email', username);
  }

  async register(dto: RegisterDTO): Promise<void> {
    await this.userService.create(dto);
  }
}

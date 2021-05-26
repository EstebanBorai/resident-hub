import jsonwebtoken from 'jsonwebtoken';

import User from '../models/user';
import {
  InvalidCreadentials,
  UserByEmailNotFound,
} from '../error/user.service';
import { ExpiredTokenProvidedForRefresh } from '../error/auth.service';

import type { SignOptions } from 'jsonwebtoken';
import type { Thruway } from '../../@types/thruway';
import type { Credentials } from '../utils/basic-auth';
import type { Role } from '../models/user';
import type { IUserService } from './user';
import type { ILoggerService } from './logger';

export type RegisterDTO = {
  email: string;
  password: string;
  role: Role;
};

export type Tokens = {
  token: string;
  refreshToken: string;
};

export interface IAuthService {
  authenticate(credentials: Credentials): Promise<Tokens>;
  register(dto: RegisterDTO): Promise<void>;
  terminateSession(token: string): Promise<void>;
  refreshToken(token: string): Promise<string>;
}

export default class AuthService implements IAuthService {
  private loggerService: ILoggerService;
  private userService: IUserService;
  private privateKey: string;
  private jwtOptions: SignOptions;

  constructor(loggerService: ILoggerService, userService: IUserService) {
    this.loggerService = loggerService;
    this.userService = userService;
    this.privateKey = process.env.JWT_PRIVATE_KEY;
    this.jwtOptions = {
      expiresIn: process.env.JWT_EXPIRATION,
    };
  }

  private signToken(user: User): string {
    return jsonwebtoken.sign(
      {
        email: user.email,
      },
      this.privateKey,
      this.jwtOptions,
    );
  }

  private async signRefreshToken(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    const refreshToken = jsonwebtoken.sign(
      {
        email: user.email,
      },
      this.privateKey,
      {
        ...this.jwtOptions,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      },
    );

    return refreshToken;
  }

  async authenticate({ username, password }: Credentials): Promise<Tokens> {
    const user = await this.userService.findByEmail(username);

    if (user) {
      const isPasswordValid = await user.validatePassword(password);

      if (isPasswordValid) {
        const token = this.signToken(user);
        const refreshToken = await this.signRefreshToken(user.email);

        await this.userService.setRefreshToken(user.email, refreshToken);

        return {
          token,
          refreshToken,
        };
      }

      throw new InvalidCreadentials();
    }

    // The username handled to the function is the
    // email from the User.
    // we are using `username` instead in order to
    // follow Basic Authentication conventions
    throw new UserByEmailNotFound(username);
  }

  async register(dto: RegisterDTO): Promise<void> {
    await this.userService.create(dto);
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const payload = jsonwebtoken.verify(
      refreshToken,
      this.privateKey,
    ) as Record<string, unknown>;
    const user = await this.userService.findByEmail(payload.email as string);

    if (user.refreshToken === refreshToken) {
      delete payload.iat;
      delete payload.exp;
      delete payload.nbf;
      delete payload.jti;

      const newToken = jsonwebtoken.sign(payload, this.privateKey, {
        ...this.jwtOptions,
      });

      return newToken;
    }

    throw new ExpiredTokenProvidedForRefresh();
  }

  async terminateSession(token: string): Promise<void> {
    const claims = jsonwebtoken.verify(
      token,
      this.privateKey,
    ) as Thruway.JwtToken;
    await this.userService.clearRefreshToken(claims.email);
  }
}

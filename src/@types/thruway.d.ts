import { Role } from '../server/models/user';

declare namespace Thruway {
  interface JwtToken {
    email: string;
    iat: number;
    exp: number;
  }

  interface User {
    email: string;
    role: Role;
  }
}

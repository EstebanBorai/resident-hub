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
  interface ParkingLot {
    id: string;
    name: string;
  }

  interface ParkingSlot {
    id: string;
    name: string;
    parkingLotId: string;
  }
}

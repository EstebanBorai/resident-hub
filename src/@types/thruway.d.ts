import { Role } from '../server/models/user';

declare namespace Thruway {
  interface JwtToken {
    email: string;
    iat: number;
    exp: number;
  }

  interface User {
    id: string;
    email: string;
    role: Role;
    createdAt: Date;
    updateAt: Date;
  }
  interface ParkingLot {
    id: string;
    name: string;
    createdAt: Date;
    updateAt: Date;
  }

  interface ParkingSlot {
    id: string;
    name: string;
    parkingLotId: string;
    createdAt: Date;
    updateAt: Date;
  }

  interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    vehicleId: string;
    userId: string;
    isResident: boolean;
    NID: string;
    createdAt: Date;
    updateAt: Date;
  }

  interface Vehicle {
    id: string;
    license: string;
    color: string;
    model: string;
    brand: string;
    driverId: string;
  }
}

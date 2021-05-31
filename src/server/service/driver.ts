import { getRepository } from 'typeorm';

import Driver from '../models/driver';

import type { IUserService } from './user';

export type CreateDriverDTO = {
  firstName: string;
  lastName: string;
  userId: string;
  vehicleId: string;
  isResident: boolean;
  NID: string;
};

export interface IDriverService {
  create(dto: CreateDriverDTO): Promise<Driver>;
  findById(id: string): Promise<Driver>;
}

export default class DriverService implements IDriverService {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async create(dto: CreateDriverDTO): Promise<Driver> {
    const driverRepository = getRepository(Driver);
    const user = await this.userService.findById(dto.userId);
    const driver = new Driver();

    driver.firstName = dto.firstName;
    driver.lastName = dto.lastName;
    driver.userId = user.id;
    driver.isResident = dto.isResident;
    driver.NID = dto.NID;

    const createdDriver = await driverRepository.save(driver);

    return createdDriver;
  }

  async findById(id: string): Promise<Driver> {
    const driverRepository = getRepository(Driver);
    const driver = await driverRepository.findOne({
      id,
    });

    if (!driver) {
      throw new Error('Driver with id not found');
    }

    return driver;
  }
}

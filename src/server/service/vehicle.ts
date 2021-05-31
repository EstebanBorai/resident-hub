import { getRepository } from 'typeorm';

import Vehicle from '../models/vehicle';

export type CreateVehicleDTO = {
  license: string;
  color: string;
  model: string;
  brand: string;
  driverId: string;
};

export interface IVehicleService {
  create(dto: CreateVehicleDTO): Promise<Vehicle>;
  findById(id: string): Promise<Vehicle>;
}

export default class VehicleService implements IVehicleService {
  async create(dto: CreateVehicleDTO): Promise<Vehicle> {
    const vehicleRepository = getRepository(Vehicle);
    const vehicle = new Vehicle();

    vehicle.license = dto.license;
    vehicle.color = dto.color;
    vehicle.model = dto.model;
    vehicle.brand = dto.brand;

    const createdVehicle = await vehicleRepository.save(vehicle);

    return createdVehicle;
  }

  async findById(id: string): Promise<Vehicle> {
    const vehicleRepository = getRepository(Vehicle);
    const vehicle = await vehicleRepository.findOne({
      id,
    });

    if (!vehicle) {
      throw new Error('Vehicle with id not found');
    }

    return vehicle;
  }
}

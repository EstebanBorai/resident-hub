import { getRepository } from 'typeorm';

import ParkingLot from '../models/parking-lot';
import { ParkingLotWithIDNotFound } from '../error/parking-lot.service';

export type CreateParkingLotDTO = {
  name: string;
};

export type UpdateParkingLotDTO = {
  id: string;
  name?: string;
};

export interface IParkingLotService {
  create(dto: CreateParkingLotDTO): Promise<ParkingLot>;
  update(dto: UpdateParkingLotDTO): Promise<ParkingLot>;
  remove(id: string): Promise<ParkingLot>;
  findById(id: string): Promise<ParkingLot>;
}

export default class ParkingLotService implements IParkingLotService {
  async create(dto: CreateParkingLotDTO): Promise<ParkingLot> {
    const parkingLotRepository = getRepository(ParkingLot);
    const parkingLot = new ParkingLot();

    parkingLot.name = dto.name;

    const createdParkingLot = await parkingLotRepository.save(parkingLot);

    return createdParkingLot;
  }

  async update(dto: UpdateParkingLotDTO): Promise<ParkingLot> {
    const parkingLotRepository = getRepository(ParkingLot);
    const parkingLot = await this.findById(dto.id);

    parkingLot.name = dto.name;

    await parkingLotRepository.update(dto.id, parkingLot);

    return parkingLot;
  }

  async remove(id: string): Promise<ParkingLot> {
    const parkingLotRepository = getRepository(ParkingLot);
    const parkingLot = await this.findById(id);

    const parkingLotRemoved = await parkingLotRepository.remove(parkingLot, {});

    return parkingLotRemoved;
  }

  async findById(id: string): Promise<ParkingLot> {
    const parkingLotRepository = getRepository(ParkingLot);
    const parkingLot = await parkingLotRepository.findOne({
      id,
    });

    if (!parkingLot) {
      throw new ParkingLotWithIDNotFound(id);
    }

    return parkingLot;
  }
}

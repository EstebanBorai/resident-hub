import ParkingLotModel from '../models/parking-lot';
import { UnexistentParkingLotID } from '../error/parking-lot.service';

import type { ParkingLot } from '../models/parking-lot';

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
    const parkingLot = new ParkingLotModel(dto);

    await parkingLot.save();

    return parkingLot;
  }

  async update(dto: UpdateParkingLotDTO): Promise<ParkingLot> {
    const parkingLot = await this.findById(dto.id);

    await parkingLot.update(dto);

    return parkingLot;
  }

  async remove(id: string): Promise<ParkingLot> {
    const parkingLot = await this.findById(id);
    const removed = await parkingLot.remove();

    return removed;
  }

  async findById(id: string): Promise<ParkingLot | null> {
    const parkingLot = await ParkingLotModel.findById(id);

    if (!parkingLot) {
      throw new UnexistentParkingLotID();
    }

    return parkingLot;
  }
}

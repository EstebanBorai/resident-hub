import ParkingLotModel from '../models/parking-lot';
import { UnexistentParkingLotID } from '../error/parking-lot.service';

import type { Thruway } from '../../@types/thruway';
import type { ParkingLot } from '../models/parking-lot';

export type CreateParkingLotDTO = {
  name: string;
};

export type UpdateParkingLotDTO = {
  id: string;
  name?: string;
};

export interface IParkingLotService {
  create(dto: CreateParkingLotDTO): Promise<Thruway.ParkingLot>;
  update(dto: UpdateParkingLotDTO): Promise<Thruway.ParkingLot>;
  remove(id: string): Promise<void>;
  findById(id: string): Promise<ParkingLot | null>;
}

export default class ParkingLotService implements IParkingLotService {
  async create(dto: CreateParkingLotDTO): Promise<Thruway.ParkingLot> {
    const parkingLot = new ParkingLotModel(dto);

    await parkingLot.save();

    return parkingLot.toJSON() as Thruway.ParkingLot;
  }

  async update(dto: UpdateParkingLotDTO): Promise<Thruway.ParkingLot> {
    const parkingLot = await this.findById(dto.id);

    await parkingLot.update(dto);

    return parkingLot.toJSON() as Thruway.ParkingLot;
  }

  async remove(id: string): Promise<void> {
    const parkingLot = await this.findById(id);

    await parkingLot.remove();

    return;
  }

  async findById(id: string): Promise<ParkingLot | null> {
    const parkingLot = await ParkingLotModel.findById(id);

    if (!parkingLot) {
      throw new UnexistentParkingLotID();
    }

    return parkingLot;
  }
}

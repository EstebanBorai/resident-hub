import ParkingSlotModel from '../models/parking-slot';
import { ParkingSlotWithIDNotFound } from '../error/parking-slot.service';

import type { ParkingSlot } from '../models/parking-slot';
import type { IParkingLotService } from './parking-lot';

export type CreateParkingSlotDTO = {
  parkingLotId: string;
  name: string;
};

export type UpdatedParkingSlotDTO = {
  id: string;
  parkingLotId: string;
  name?: string;
};

export interface IParkingSlotService {
  create(parkingLotId: string, dto: CreateParkingSlotDTO): Promise<ParkingSlot>;
  update(dto: UpdatedParkingSlotDTO): Promise<ParkingSlot>;
  remove(id: string): Promise<ParkingSlot>;
  findById(id: string): Promise<ParkingSlot | null>;
}

export default class ParkingSlotService implements IParkingSlotService {
  private parkingLotService: IParkingLotService;

  constructor(parkingSlotService: IParkingLotService) {
    this.parkingLotService = parkingSlotService;
  }

  async create(
    parkingLotId: string,
    dto: CreateParkingSlotDTO,
  ): Promise<ParkingSlot> {
    const parkingLot = await this.parkingLotService.findById(parkingLotId);
    const parkingSlot = new ParkingSlotModel({
      ...dto,
      parkingLotId: parkingLot.id,
    });

    await parkingSlot.save();

    return parkingSlot;
  }

  async update(dto: UpdatedParkingSlotDTO): Promise<ParkingSlot> {
    const parkingLot = await this.parkingLotService.findById(dto.parkingLotId);
    const parkingSlot = await this.findById(dto.id);

    await parkingSlot.update({
      ...dto,
      parkingLotId: parkingLot.id,
    });

    return parkingSlot;
  }

  async remove(id: string): Promise<ParkingSlot> {
    const parkingSlot = await this.findById(id);
    const removed = await parkingSlot.remove();

    return removed;
  }

  async findById(id: string): Promise<ParkingSlot> {
    const parkingSlot = await ParkingSlotModel.findById(id);

    if (!parkingSlot) {
      throw new ParkingSlotWithIDNotFound(id);
    }

    return parkingSlot;
  }
}

import ParkingSlot from '../models/parking-slot';
import { ParkingSlotWithIDNotFound } from '../error/parking-slot.service';

import type { IParkingLotService } from './parking-lot';
import { getRepository } from 'typeorm';

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
    const parkingSlotRepository = getRepository(ParkingSlot);
    const parkingLot = await this.parkingLotService.findById(parkingLotId);
    const parkingSlot = new ParkingSlot();

    parkingSlot.name = dto.name;
    parkingSlot.parkingLotId = parkingLot.id;

    const createdParkingSlot = await parkingSlotRepository.save(parkingSlot);

    return createdParkingSlot;
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
    const parkingSlot = await ParkingSlot.findById(id);

    if (!parkingSlot) {
      throw new ParkingSlotWithIDNotFound(id);
    }

    return parkingSlot;
  }
}

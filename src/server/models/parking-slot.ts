import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import ParkingLot from './parking-lot';

import type { ResidentHub } from '../../@types/resident-hub';

@Entity({ name: 'parking_slots' })
export default class ParkingSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToOne(() => ParkingLot, (parkingLot) => parkingLot.slots)
  public parkingLotId: string;

  public toPresentationLayer(): ResidentHub.ParkingSlot {
    return {
      id: this.id,
      name: this.name,
      parkingLotId: this.parkingLotId,
      createdAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}

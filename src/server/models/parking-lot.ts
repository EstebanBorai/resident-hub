import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import ParkingSlot from './parking-slot';

import type { Thruway } from '../../@types/thruway';

@Entity({ name: 'parking_lots' })
export default class ParkingLot {
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

  @OneToMany(() => ParkingSlot, (parkingSlot) => parkingSlot.parkingLotId)
  public slots: ParkingSlot[];

  public toPresentationLayer(): Thruway.ParkingLot {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}

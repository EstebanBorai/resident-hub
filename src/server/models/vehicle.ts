import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Thruway } from '../../@types/thruway';

@Entity({ name: 'vehicles' })
export default class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  license: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  color: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  model: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  brand: string;

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

  // @ManyToMany(() => Driver, (driver) => driver.id)
  // @JoinTable()
  // public driverId: string;

  public toPresentationLayer(): Thruway.Vehicle {
    return {
      id: this.id,
      license: this.license,
      color: this.color,
      model: this.model,
      brand: this.brand,
      driverId: this.driverId,
    };
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

import type { Thruway } from '../../@types/thruway';

export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
}

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 254,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  refreshToken: string;

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

  public isAllowed(requiredRoles: Role[]): boolean {
    return requiredRoles.includes(this.role);
  }

  public async validatePassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password);
  }

  public toPresentationLayer(): Thruway.User {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}

import * as r from 'runtypes';
import { Thruway } from '../../@types/thruway';

export const USERS_TABLE_NAME = 'users';

export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersTableRows {
  id: string;
  email: string;
  password: string;
  role: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

export const UserRuntype = r.Record({
  id: r.Optional(r.String),
  email: r.String,
  password: r.String,
  role: r.Union(r.Literal('admin'), r.Literal('manager'), r.Literal('user')),
  refreshToken: r.Optional(r.String),
  createdAt: r.Optional(r.InstanceOf(Date)),
  updatedAt: r.Optional(r.InstanceOf(Date)),
});

export const mapper = {
  toPresentationLayer: function (data: User): Thruway.User {
    return {
      id: data.id,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  fromDatabaseRow: function (data: UsersTableRows): User {
    return {
      id: data.id,
      email: data.email,
      password: data.password,
      role: Role[data.role],
      refreshToken: data.refresh_token,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  },
};

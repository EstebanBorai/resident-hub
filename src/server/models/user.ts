import bcrypt from 'bcrypt';
import { Document, Schema, model, Model } from 'mongoose';

import type { Thruway } from '../../@types/thruway';

export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
}

export interface User extends Document {
  email: string;
  password: string;
  role: Role;
  refreshToken: string;
  validatePassword(hash: string): Promise<boolean>;
  isAllowed(requiredRoles: Role[]): boolean;
  toPresentationLayer(): Thruway.User;
}

export const UserSchema = new Schema<User, Model<User, User>>(
  {
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
        dropDups: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: [
          Role.Admin.toString(),
          Role.Manager.toString(),
          Role.User.toString(),
        ],
        message: `"{VALUE}" is not a valid "UserModel.role" value`,
      },
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  },
);

UserSchema.methods.validatePassword = async function (
  plain: string,
): Promise<boolean> {
  return bcrypt.compare(plain, this.password);
};

UserSchema.methods.isAllowed = function (requiredRoles: Role[]): boolean {
  return requiredRoles.includes(this.role);
};

UserSchema.methods.toPresentationLayer = function (): Thruway.User {
  return {
    email: this.email,
    role: this.role,
  };
};

const UserModel = model<User>('User', UserSchema);

export default UserModel;

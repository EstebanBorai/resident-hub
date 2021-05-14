import bcrypt from 'bcrypt';
import { Document, Schema, model, Model } from 'mongoose';

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
}

export const UserSchema = new Schema<User, Model<User, User>>({
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
    enum: ['admin', 'manager', 'user'],
    default: 'user',
  },
  refreshToken: {
    type: String,
    required: false,
  },
});

UserSchema.methods.validatePassword = async function (
  plain: string,
): Promise<boolean> {
  return bcrypt.compare(plain, this.password);
};

UserSchema.methods.toJSON = function (): Thruway.User {
  return {
    email: this.email,
  };
};

const UserModel = model<User>('User', UserSchema);

export default UserModel;

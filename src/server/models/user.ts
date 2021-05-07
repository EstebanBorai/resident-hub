import bcrypt from 'bcrypt';
import { Document, Schema, model, Model } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  validatePassword(plain: string, hash: string): Promise<string>;
}

export const UserSchema = new Schema<User, Model<User, User>>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.validatePassword = async function (
  plain: string,
): Promise<boolean> {
  return bcrypt.compare(plain, this.password);
};

const UserModel = model<User>('User', UserSchema);

export default UserModel;

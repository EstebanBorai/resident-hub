import bcrypt from 'bcrypt';

import UserModel from '../models/user';

export type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IUserService {
  create(dto: CreateUserDTO): Promise<void>;
}

async function createPassword(plain: string): Promise<string> {
  const hash = await bcrypt.hash(plain, 10);

  return hash;
}

export default {
  async create(dto: CreateUserDTO): Promise<void> {
    const user = new UserModel(dto);
    const hash = await createPassword(dto.password);

    user.password = hash;

    await user.save();
  },
};

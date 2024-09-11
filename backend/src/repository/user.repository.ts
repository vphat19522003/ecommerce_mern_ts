import { omit } from 'lodash';
import mongoose from 'mongoose';

import UserModel from '@app/models/user.model';

export type UserInfo = {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
};

class UserRepository {
  static async createUser({ email, username, password }: UserInfo): Promise<UserInfo> {
    const user = await UserModel.create({ email, username, password });
    if (!user) throw new Error('Failed to create user');

    return omit(user.toObject(), '__v', 'createdAt', 'updatedAt') as UserInfo;
  }

  static async findUserByEmail({ email }: Pick<UserInfo, 'email'>): Promise<Pick<UserInfo, 'email'> | null> {
    const existEmail = await UserModel.findOne({ email }).lean();

    return existEmail;
  }

  static async findUserByUsername({ username }: Pick<UserInfo, 'username'>): Promise<UserInfo> {
    const user = await UserModel.findOne({ username });

    return user?.toObject() as UserInfo;
  }

  static async findUserById(userId: string): Promise<UserInfo> {
    const foundUser = await UserModel.findById(new mongoose.Types.ObjectId(userId));

    return foundUser?.toObject() as UserInfo;
  }
}

export default UserRepository;

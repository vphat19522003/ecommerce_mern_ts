import { omit } from 'lodash';
import mongoose, { Types } from 'mongoose';

import UserModel, { Gender, Role } from '@app/models/user.model';

export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  fullName: string;
  phone: string;
  passport: string;
  gender?: Gender;
  role: Role;
  avatar_url: string;
  createdAt?: string;
};

class UserRepository {
  static async createUser({
    email,
    username,
    password
  }: Pick<UserInfo, 'email' | 'username' | 'password'>): Promise<UserInfo> {
    const user = await UserModel.create({ email, username, password });
    if (!user) throw new Error('Failed to create user');

    return omit(user.toObject(), '__v', 'updatedAt') as UserInfo;
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

  static async updateUserById({
    _id,
    fullName,
    phone,
    passport,
    gender
  }: Omit<UserInfo, 'email' | 'password' | 'isVerified' | 'role' | 'avatar_url' | 'username'>): Promise<UserInfo> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      {
        $set: {
          fullName,
          phone,
          passport,
          gender
        }
      },
      { new: true }
    );

    return updatedUser?.toObject() as UserInfo;
  }

  static async updateUserPassword({ _id, hashedPassword }: { _id: string; hashedPassword: string }): Promise<UserInfo> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      {
        $set: {
          password: hashedPassword
        }
      },
      { new: true }
    );

    return updatedUser?.toObject() as UserInfo;
  }
}

export default UserRepository;

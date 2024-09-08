import UserModel from '@app/models/user.model';

export type UserInfo = {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
};

class UserRepository {
  static async createUser({ email, username, password }: UserInfo): Promise<UserInfo> {
    const user = await UserModel.create({ email, username, password });
    if (!user) throw new Error('Failed to create user');

    return user.toObject();
  }

  static async findUserByEmail({ email }: Pick<UserInfo, 'email'>): Promise<Pick<UserInfo, 'email'> | null> {
    const existEmail = await UserModel.findOne({ email }).lean();

    return existEmail;
  }

  static async findUserByUsername({
    username
  }: Pick<UserInfo, 'username'>): Promise<Pick<UserInfo, 'username'> | null> {
    const existUsername = await UserModel.findOne({ username }).lean();

    return existUsername;
  }
}

export default UserRepository;

import bcrypt from 'bcrypt';
import { omit } from 'lodash';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import UserRepository, { UserInfo } from '@app/repository/user.repository';

class UserService {
  static async getUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const user = req.user as UserInfo;
    return omit(user, 'password', '__v', 'updatedAt');
  }

  static async updateUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const { _id } = req.user as UserInfo;
    const { fullName, phone, passport, gender } = req.body as UserInfo;

    const updatedUser = await UserRepository.updateUserById({
      _id,
      fullName,
      phone,
      passport,
      gender
    });

    return omit(updatedUser, 'password', '__v', 'updatedAt');
  }

  static async changePassword(req: IRequestCustom): Promise<void> {
    const { _id, password } = req.user as UserInfo;
    const { old_password, new_password } = req.body;

    const comparePass = bcrypt.compareSync(old_password, password);
    if (!comparePass) throw new CustomError('Current password is not match', STATUS_CODE.BAD_REQUEST);

    // Hash the password
    const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);

    const newPasswordUser = await UserRepository.updateUserPassword({ _id, hashedPassword });
    if (!newPasswordUser) throw new CustomError("Can't change password", STATUS_CODE.INTERNAL_SERVER_ERROR);
  }
}

export default UserService;

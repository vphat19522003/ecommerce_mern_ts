import { omit } from 'lodash';

import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import { UserInfo } from '@app/repository/user.repository';

class UserService {
  static async getUser(req: IRequestCustom): Promise<Omit<UserInfo, 'password'>> {
    const user = req.user as UserInfo;
    return omit(user, 'password', '__v', 'updatedAt', 'createdAt');
  }
}

export default UserService;

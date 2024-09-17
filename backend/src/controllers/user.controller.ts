import { Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import UserService from '@app/services/user.service';

export const getUserController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.getUser(req);

  return res.json({
    message: 'Get user successfully',
    result,
    status: STATUS_CODE.OK
  });
};

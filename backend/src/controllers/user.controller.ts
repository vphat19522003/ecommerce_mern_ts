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

export const updateUserController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.updateUser(req);

  return res.json({
    message: 'Update user successfully',
    result,
    status: STATUS_CODE.OK
  });
};

export const changePasswordController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  await UserService.changePassword(req);

  return res.json({
    message: 'Change password successfully',
    status: STATUS_CODE.OK
  });
};

export const addAddressController = async (req: IRequestCustom, res: Response): Promise<Response> => {
  const result = await UserService.addAddress(req);

  return res.json({
    message: 'Add address successfully',
    status: STATUS_CODE.OK,
    result
  });
};

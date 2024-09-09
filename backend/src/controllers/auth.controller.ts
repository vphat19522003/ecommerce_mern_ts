import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import AuthService from '@app/services/auth.service';

export const registerController = async (req: Request, res: Response): Promise<Response> => {
  const result = await AuthService.register(req, res);

  return res.json({
    message: 'Create user successfully',
    result,
    status: STATUS_CODE.OK
  });
};

export const verifyOTPController = async (req: Request, res: Response) => {
  return res.json({
    message: 'IN Verify OTP'
  });
};

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import UserRepository from '@app/repository/user.repository';

const verifyAccountHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const access_token = req.cookies['access_token'];
  const client_id = req.cookies['client_id'];

  if (!access_token || !client_id) return next(new CustomError('Access token not provided', STATUS_CODE.UNAUTHORIZED));
  // client_id format
  if (!mongoose.Types.ObjectId.isValid(client_id)) {
    return next(new CustomError('Invalid client ID format', STATUS_CODE.BAD_REQUEST));
  }

  //find user
  const user = await UserRepository.findUserById(client_id);
  if (!user) return next(new CustomError('User not found', STATUS_CODE.UNAUTHORIZED));

  if (!user.isVerified) {
    return next(new CustomError('Account is not verified', STATUS_CODE.UNAUTHORIZED));
  }
  return next();
};

export default verifyAccountHandler;

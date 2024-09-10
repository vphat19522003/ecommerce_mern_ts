import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import KeyService from '@app/services/key.service';
import { payloadType } from '@app/utils/token.util';

const verifyAccountHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const access_token = req.cookies['access_token'];
  const client_id = req.cookies['client_id'];

  if (!access_token || !client_id) return next(new CustomError('Access token not provided', STATUS_CODE.UNAUTHORIZED));

  //find public key
  const key = await KeyService.findKeyByUserId(client_id);
  if (!key) return next(new CustomError('Key not found', STATUS_CODE.UNAUTHORIZED));

  try {
    const decode = jwt.verify(access_token, key.public_key) as payloadType;
    console.log(decode.isVerified);
    if (!decode.isVerified) {
      return next(new CustomError('Account is not verified', STATUS_CODE.UNAUTHORIZED));
    }
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new CustomError('Access token expired', STATUS_CODE.UNAUTHORIZED));
    }

    if (error instanceof JsonWebTokenError) {
      return next(new CustomError('Invalid access token', STATUS_CODE.FORBIDDEN));
    }

    return next(new CustomError('Unknown error occurred', STATUS_CODE.INTERNAL_SERVER_ERROR));
  }
};

export default verifyAccountHandler;

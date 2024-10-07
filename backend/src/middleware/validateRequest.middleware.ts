import { NextFunction, Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';

const { validationResult } = require('express-validator');

const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors: any = [];
    errors.array().map((err: any) => extractedErrors.push(err.msg));
    throw new CustomError(extractedErrors[0], STATUS_CODE.BAD_REQUEST);
  }
  next();
};

export default validateRequest;

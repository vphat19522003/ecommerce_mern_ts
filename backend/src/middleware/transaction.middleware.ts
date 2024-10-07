import { NextFunction, Request, Response } from 'express';
import mongoose, { InferSchemaType } from 'mongoose';

interface IRequestCustom<T = any> extends Request {
  session?: InferSchemaType<mongoose.ClientSession>;
}

export const transactionMiddleware = async (req: IRequestCustom, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    req.session = session;
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log('Error at middleware', error);
    res.status(500).json({ message: 'Transaction failed' });
  }
};

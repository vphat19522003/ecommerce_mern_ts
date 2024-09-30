import { Router } from 'express';

import authRouter from './auth';
import locationRouter from './location';
import testRouter from './test';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/location', locationRouter);

//TEST
router.use('/test', testRouter);

export default router;

import { Router } from 'express';

import authRouter from './auth';
import categoryRouter from './category';
import locationRouter from './location';
import testRouter from './test';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/location', locationRouter);
router.use('/category', categoryRouter);

//TEST
router.use('/test', testRouter);

export default router;

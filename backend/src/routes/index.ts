import { Router } from 'express';

import authRouter from './auth';
import locationRouter from './location';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/location', locationRouter);

export default router;

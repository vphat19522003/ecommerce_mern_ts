import { Router } from 'express';

import { getUserController } from '@app/controllers/user.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import reqHandler from '@app/utils/reqHandler';

const userRouter = Router();

userRouter.get('/get-user', verifyAccessToken, reqHandler(getUserController));

export default userRouter;

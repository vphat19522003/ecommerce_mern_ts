import { Router } from 'express';

import {
  addAddressController,
  changePasswordController,
  getUserController,
  updateUserController
} from '@app/controllers/user.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import reqHandler from '@app/utils/reqHandler';

const userRouter = Router();

userRouter.get('/get-user', verifyAccessToken, reqHandler(getUserController));
userRouter.post('/update-user', verifyAccessToken, verifyAccountHandler, reqHandler(updateUserController));
userRouter.post('/change-password', verifyAccessToken, verifyAccountHandler, reqHandler(changePasswordController));
userRouter.post('/add-address', verifyAccessToken, verifyAccountHandler, reqHandler(addAddressController));

export default userRouter;

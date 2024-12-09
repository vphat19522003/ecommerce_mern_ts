import { Router } from 'express';

import { addToCartController } from '@app/controllers/cart.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import reqHandler from '@app/utils/reqHandler';

const cartRouter = Router();

cartRouter.post('/add-cart', verifyAccessToken, verifyAccountHandler, reqHandler(addToCartController));

export default cartRouter;

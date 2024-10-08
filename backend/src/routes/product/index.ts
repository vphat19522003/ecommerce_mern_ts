import { Router } from 'express';

import { createProductController } from '@app/controllers/product.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import validateRequest from '@app/middleware/validateRequest.middleware';
import verifyCategory from '@app/middleware/verifyCategory.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';
import productValidators from '@app/validation/product.validate';

const productRouter = Router();

productRouter.post(
  '/create-product',
  verifyAccessToken,
  upload.single('file'),
  verifyCategory,
  validateRequest(productValidators.createProduct),
  reqHandler(createProductController)
);

export default productRouter;
